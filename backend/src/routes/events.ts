import express from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient, UserRole, EventStatus } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth';
import { sendEmail, emailTemplates } from '../utils/email';

const router = express.Router();
const prisma = new PrismaClient();

// Get all events
router.get('/', authenticate, async (req, res) => {
  try {
    const { role, userId } = req.user!;
    
    let whereClause: any = {};
    
    // Role-based filtering
    if (role === UserRole.EVENT_TEAM_LEAD) {
      whereClause.creatorId = userId;
    } else if (role === UserRole.EVENT_COORDINATOR) {
      whereClause.coordinatorId = userId;
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        },
        coordinator: {
          select: { id: true, name: true, email: true }
        },
        budgets: {
          include: {
            category: true
          }
        },
        budgetApprovals: {
          include: {
            reviewer: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        _count: {
          select: {
            expenses: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get event by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, userId } = req.user!;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        },
        coordinator: {
          select: { id: true, name: true, email: true }
        },
        budgets: {
          include: {
            category: true
          }
        },
        budgetApprovals: {
          include: {
            reviewer: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        expenses: {
          include: {
            category: true,
            addedBy: {
              select: { id: true, name: true, email: true }
            },
            product: true
          }
        }
      }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check permissions
    if (role === UserRole.EVENT_TEAM_LEAD && event.creatorId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    if (role === UserRole.EVENT_COORDINATOR && event.coordinatorId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create event
router.post('/', authenticate, authorize([UserRole.EVENT_TEAM_LEAD, UserRole.ADMIN]), [
  body('name').notEmpty().trim(),
  body('description').optional().trim(),
  body('type').isIn(['CULTURAL', 'TECHNICAL', 'WORKSHOP', 'COMPETITION', 'SEMINAR']),
  body('expectedParticipants').optional().isInt({ min: 1 }),
  body('venue').optional().trim(),
  body('dateTime').optional().isISO8601(),
  body('coordinatorId').optional().isUUID(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const eventData = {
      ...req.body,
      creatorId: req.user!.userId,
      dateTime: req.body.dateTime ? new Date(req.body.dateTime) : null
    };

    const event = await prisma.event.create({
      data: eventData,
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        },
        coordinator: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    // Send email to coordinator if assigned
    if (event.coordinator) {
      try {
        const emailContent = emailTemplates.eventCreated(
          event.name,
          event.creator.name,
          event.coordinator.name
        );
        await sendEmail({
          to: event.coordinator.email,
          subject: emailContent.subject,
          html: emailContent.html
        });
      } catch (emailError) {
        console.error('Failed to send event created email:', emailError);
      }
    }

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event
router.put('/:id', authenticate, [
  body('name').optional().notEmpty().trim(),
  body('description').optional().trim(),
  body('type').optional().isIn(['CULTURAL', 'TECHNICAL', 'WORKSHOP', 'COMPETITION', 'SEMINAR']),
  body('expectedParticipants').optional().isInt({ min: 1 }),
  body('venue').optional().trim(),
  body('dateTime').optional().isISO8601(),
  body('coordinatorId').optional().isUUID(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() });
    }

    const { id } = req.params;
    const { role, userId } = req.user!;

    const existingEvent = await prisma.event.findUnique({
      where: { id },
      select: { creatorId: true }
    });

    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check permissions
    if (role === UserRole.EVENT_TEAM_LEAD && existingEvent.creatorId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updateData = { ...req.body };
    if (req.body.dateTime) {
      updateData.dateTime = new Date(req.body.dateTime);
    }

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        },
        coordinator: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event
router.delete('/:id', authenticate, authorize([UserRole.ADMIN]), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({
      where: { id }
    });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;