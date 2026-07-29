import { and, desc, eq } from 'drizzle-orm';

import { db } from '@/libs/DB';
import {
  clients,
  projects,
  scheduleItems,
  tasks,
} from '@/models/Schema';
import 'server-only';

export type StudioDataContext = {
  organizationId: string;
  userId: string;
  role: string;
};

/**
 * Every business query receives an authenticated organization context and
 * applies it in the SQL predicate. Never expose unscoped table helpers to
 * route handlers or Server Actions.
 */
export const studioRepository = {
  async listProjects(context: StudioDataContext) {
    return db
      .select()
      .from(projects)
      .where(eq(projects.organizationId, context.organizationId))
      .orderBy(desc(projects.updatedAt));
  },

  async getProject(context: StudioDataContext, projectId: string) {
    const [project] = await db
      .select()
      .from(projects)
      .where(and(
        eq(projects.organizationId, context.organizationId),
        eq(projects.id, projectId),
      ))
      .limit(1);

    return project ?? null;
  },

  async listClients(context: StudioDataContext) {
    return db
      .select()
      .from(clients)
      .where(eq(clients.organizationId, context.organizationId))
      .orderBy(desc(clients.updatedAt));
  },

  async listProjectSchedule(context: StudioDataContext, projectId: string) {
    const project = await this.getProject(context, projectId);
    if (!project) {
      return [];
    }

    return db
      .select()
      .from(scheduleItems)
      .where(eq(scheduleItems.projectId, project.id))
      .orderBy(desc(scheduleItems.updatedAt));
  },

  async listMyTasks(context: StudioDataContext) {
    return db
      .select()
      .from(tasks)
      .where(and(
        eq(tasks.organizationId, context.organizationId),
        eq(tasks.assigneeId, context.userId),
      ))
      .orderBy(desc(tasks.updatedAt));
  },
};
