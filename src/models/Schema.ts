import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { organization, user } from './AuthSchema';

export * from './AuthSchema';

const id = () =>
  text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const studioPlanEnum = pgEnum('studio_plan', [
  'trial',
  'free',
  'studio',
  'business',
  'enterprise',
]);

export const projectStatusEnum = pgEnum('project_status', [
  'lead',
  'planning',
  'designing',
  'procurement',
  'construction',
  'completed',
  'archived',
]);

export const designStageEnum = pgEnum('design_stage', [
  'brief',
  'survey',
  'concept',
  'schematic',
  'development',
  'documentation',
  'delivery',
]);

export const workflowStatusEnum = pgEnum('workflow_status', [
  'not_started',
  'in_progress',
  'in_review',
  'approved',
  'blocked',
  'completed',
]);

export const scheduleStatusEnum = pgEnum('schedule_status', [
  'intent',
  'comparing',
  'confirmed',
  'ordered',
  'delivered',
  'changing',
]);

export const financeDocumentTypeEnum = pgEnum('finance_document_type', [
  'design_fee',
  'contract',
  'quotation',
  'change_order',
  'invoice',
]);

export const financeStatusEnum = pgEnum('finance_status', [
  'draft',
  'sent',
  'viewed',
  'approved',
  'partially_paid',
  'paid',
  'void',
  'overdue',
]);

export const taskStatusEnum = pgEnum('task_status', [
  'todo',
  'in_progress',
  'in_review',
  'done',
  'cancelled',
]);

export const priorityEnum = pgEnum('priority', [
  'low',
  'medium',
  'high',
  'urgent',
]);

export const visibilityEnum = pgEnum('visibility', [
  'private',
  'team',
  'client',
]);

export const aiJobStatusEnum = pgEnum('ai_job_status', [
  'queued',
  'running',
  'succeeded',
  'failed',
  'cancelled',
]);

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'trialing',
  'active',
  'past_due',
  'paused',
  'cancelled',
]);

export const studioProfiles = pgTable('studio_profile', {
  organizationId: text('organization_id')
    .primaryKey()
    .references(() => organization.id, { onDelete: 'cascade' }),
  displayName: text('display_name').notNull(),
  legalName: text('legal_name'),
  plan: studioPlanEnum('plan').default('trial').notNull(),
  industry: text('industry').default('interior_design').notNull(),
  locale: text('locale').default('zh').notNull(),
  currency: text('currency').default('CNY').notNull(),
  timezone: text('timezone').default('Asia/Shanghai').notNull(),
  logoUrl: text('logo_url'),
  coverUrl: text('cover_url'),
  settings: jsonb('settings').$type<Record<string, unknown>>().default({}).notNull(),
  ...timestamps,
});

export const clients = pgTable(
  'client',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    ownerId: text('owner_id').references(() => user.id, { onDelete: 'set null' }),
    name: text('name').notNull(),
    company: text('company'),
    email: text('email'),
    phone: text('phone'),
    wechat: text('wechat'),
    source: text('source'),
    status: text('status').default('active').notNull(),
    tags: jsonb('tags').$type<string[]>().default([]).notNull(),
    address: text('address'),
    notes: text('notes'),
    ...timestamps,
  },
  table => [
    index('client_org_idx').on(table.organizationId),
    index('client_owner_idx').on(table.ownerId),
    index('client_name_idx').on(table.name),
  ],
);

export const clientContacts = pgTable(
  'client_contact',
  {
    id: id(),
    clientId: text('client_id')
      .notNull()
      .references(() => clients.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    role: text('role'),
    email: text('email'),
    phone: text('phone'),
    isPrimary: boolean('is_primary').default(false).notNull(),
    ...timestamps,
  },
  table => [index('client_contact_client_idx').on(table.clientId)],
);

export const projects = pgTable(
  'project',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    clientId: text('client_id').references(() => clients.id, { onDelete: 'set null' }),
    ownerId: text('owner_id').references(() => user.id, { onDelete: 'set null' }),
    code: text('code').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    status: projectStatusEnum('status').default('planning').notNull(),
    currentStage: designStageEnum('current_stage').default('brief').notNull(),
    coverUrl: text('cover_url'),
    propertyType: text('property_type'),
    address: text('address'),
    areaSquareMeters: numeric('area_square_meters', { precision: 10, scale: 2 }),
    budgetAmount: numeric('budget_amount', { precision: 14, scale: 2 }),
    currency: text('currency').default('CNY').notNull(),
    startsAt: timestamp('starts_at', { withTimezone: true }),
    targetCompletionAt: timestamp('target_completion_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    tags: jsonb('tags').$type<string[]>().default([]).notNull(),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  table => [
    uniqueIndex('project_org_code_uidx').on(table.organizationId, table.code),
    index('project_org_status_idx').on(table.organizationId, table.status),
    index('project_client_idx').on(table.clientId),
  ],
);

export const projectMembers = pgTable(
  'project_member',
  {
    id: id(),
    projectId: text('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    role: text('role').default('designer').notNull(),
    allocationPercent: integer('allocation_percent').default(100).notNull(),
    ...timestamps,
  },
  table => [
    uniqueIndex('project_member_uidx').on(table.projectId, table.userId),
    index('project_member_user_idx').on(table.userId),
  ],
);

export const projectStages = pgTable(
  'project_stage',
  {
    id: id(),
    projectId: text('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    stage: designStageEnum('stage').notNull(),
    status: workflowStatusEnum('status').default('not_started').notNull(),
    sequence: integer('sequence').notNull(),
    progress: integer('progress').default(0).notNull(),
    ownerId: text('owner_id').references(() => user.id, { onDelete: 'set null' }),
    startsAt: timestamp('starts_at', { withTimezone: true }),
    dueAt: timestamp('due_at', { withTimezone: true }),
    approvedAt: timestamp('approved_at', { withTimezone: true }),
    approvedBy: text('approved_by').references(() => user.id, { onDelete: 'set null' }),
    notes: text('notes'),
    ...timestamps,
  },
  table => [
    uniqueIndex('project_stage_uidx').on(table.projectId, table.stage),
    index('project_stage_status_idx').on(table.projectId, table.status),
  ],
);

export const spaces = pgTable(
  'space',
  {
    id: id(),
    projectId: text('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    parentId: text('parent_id'),
    name: text('name').notNull(),
    floor: text('floor'),
    areaSquareMeters: numeric('area_square_meters', { precision: 10, scale: 2 }),
    sequence: integer('sequence').default(0).notNull(),
    planFileId: text('plan_file_id'),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  table => [index('space_project_idx').on(table.projectId)],
);

export const boards = pgTable(
  'board',
  {
    id: id(),
    projectId: text('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    stageId: text('stage_id').references(() => projectStages.id, { onDelete: 'set null' }),
    createdBy: text('created_by').references(() => user.id, { onDelete: 'set null' }),
    name: text('name').notNull(),
    kind: text('kind').default('moodboard').notNull(),
    visibility: visibilityEnum('visibility').default('team').notNull(),
    width: integer('width').default(1920).notNull(),
    height: integer('height').default(1080).notNull(),
    version: integer('version').default(1).notNull(),
    thumbnailUrl: text('thumbnail_url'),
    ...timestamps,
  },
  table => [
    index('board_project_idx').on(table.projectId),
    index('board_stage_idx').on(table.stageId),
  ],
);

export const boardItems = pgTable(
  'board_item',
  {
    id: id(),
    boardId: text('board_id')
      .notNull()
      .references(() => boards.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    zIndex: integer('z_index').default(0).notNull(),
    content: jsonb('content').$type<Record<string, unknown>>().default({}).notNull(),
    frame: jsonb('frame')
      .$type<{ x: number; y: number; width: number; height: number; rotation?: number }>()
      .notNull(),
    ...timestamps,
  },
  table => [index('board_item_board_idx').on(table.boardId)],
);

export const vendors = pgTable(
  'vendor',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    category: text('category'),
    contactName: text('contact_name'),
    email: text('email'),
    phone: text('phone'),
    website: text('website'),
    address: text('address'),
    rating: integer('rating'),
    notes: text('notes'),
    ...timestamps,
  },
  table => [
    index('vendor_org_idx').on(table.organizationId),
    index('vendor_name_idx').on(table.name),
  ],
);

export const scheduleItems = pgTable(
  'schedule_item',
  {
    id: id(),
    projectId: text('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    spaceId: text('space_id').references(() => spaces.id, { onDelete: 'set null' }),
    vendorId: text('vendor_id').references(() => vendors.id, { onDelete: 'set null' }),
    ownerId: text('owner_id').references(() => user.id, { onDelete: 'set null' }),
    sku: text('sku'),
    name: text('name').notNull(),
    category: text('category').notNull(),
    brand: text('brand'),
    specification: text('specification'),
    imageUrl: text('image_url'),
    status: scheduleStatusEnum('status').default('intent').notNull(),
    quantity: numeric('quantity', { precision: 12, scale: 2 }).default('1').notNull(),
    unit: text('unit').default('件').notNull(),
    unitPrice: numeric('unit_price', { precision: 14, scale: 2 }),
    currency: text('currency').default('CNY').notNull(),
    leadTimeDays: integer('lead_time_days'),
    targetDeliveryAt: timestamp('target_delivery_at', { withTimezone: true }),
    orderedAt: timestamp('ordered_at', { withTimezone: true }),
    deliveredAt: timestamp('delivered_at', { withTimezone: true }),
    clientApprovedAt: timestamp('client_approved_at', { withTimezone: true }),
    notes: text('notes'),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  table => [
    index('schedule_project_status_idx').on(table.projectId, table.status),
    index('schedule_space_idx').on(table.spaceId),
    index('schedule_vendor_idx').on(table.vendorId),
  ],
);

export const financeDocuments = pgTable(
  'finance_document',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    projectId: text('project_id').references(() => projects.id, { onDelete: 'set null' }),
    clientId: text('client_id').references(() => clients.id, { onDelete: 'set null' }),
    createdBy: text('created_by').references(() => user.id, { onDelete: 'set null' }),
    documentNo: text('document_no').notNull(),
    type: financeDocumentTypeEnum('type').notNull(),
    status: financeStatusEnum('status').default('draft').notNull(),
    title: text('title').notNull(),
    currency: text('currency').default('CNY').notNull(),
    subtotal: numeric('subtotal', { precision: 14, scale: 2 }).default('0').notNull(),
    taxAmount: numeric('tax_amount', { precision: 14, scale: 2 }).default('0').notNull(),
    totalAmount: numeric('total_amount', { precision: 14, scale: 2 }).default('0').notNull(),
    paidAmount: numeric('paid_amount', { precision: 14, scale: 2 }).default('0').notNull(),
    issuedAt: timestamp('issued_at', { withTimezone: true }),
    dueAt: timestamp('due_at', { withTimezone: true }),
    approvedAt: timestamp('approved_at', { withTimezone: true }),
    clientSnapshot: jsonb('client_snapshot').$type<Record<string, unknown>>().default({}).notNull(),
    terms: text('terms'),
    notes: text('notes'),
    ...timestamps,
  },
  table => [
    uniqueIndex('finance_doc_org_no_uidx').on(table.organizationId, table.documentNo),
    index('finance_doc_project_idx').on(table.projectId),
    index('finance_doc_status_idx').on(table.organizationId, table.status),
  ],
);

export const financeLineItems = pgTable(
  'finance_line_item',
  {
    id: id(),
    documentId: text('document_id')
      .notNull()
      .references(() => financeDocuments.id, { onDelete: 'cascade' }),
    scheduleItemId: text('schedule_item_id').references(() => scheduleItems.id, {
      onDelete: 'set null',
    }),
    sequence: integer('sequence').default(0).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    quantity: numeric('quantity', { precision: 12, scale: 2 }).default('1').notNull(),
    unit: text('unit').default('项').notNull(),
    unitPrice: numeric('unit_price', { precision: 14, scale: 2 }).default('0').notNull(),
    taxRate: numeric('tax_rate', { precision: 6, scale: 4 }).default('0').notNull(),
    amount: numeric('amount', { precision: 14, scale: 2 }).default('0').notNull(),
    ...timestamps,
  },
  table => [index('finance_line_document_idx').on(table.documentId)],
);

export const payments = pgTable(
  'payment',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    documentId: text('document_id').references(() => financeDocuments.id, {
      onDelete: 'set null',
    }),
    projectId: text('project_id').references(() => projects.id, { onDelete: 'set null' }),
    amount: numeric('amount', { precision: 14, scale: 2 }).notNull(),
    currency: text('currency').default('CNY').notNull(),
    method: text('method'),
    provider: text('provider').default('manual').notNull(),
    providerReference: text('provider_reference'),
    receivedAt: timestamp('received_at', { withTimezone: true }).notNull(),
    notes: text('notes'),
    createdBy: text('created_by').references(() => user.id, { onDelete: 'set null' }),
    ...timestamps,
  },
  table => [
    index('payment_org_idx').on(table.organizationId),
    index('payment_document_idx').on(table.documentId),
  ],
);

export const constructionItems = pgTable(
  'construction_item',
  {
    id: id(),
    projectId: text('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    spaceId: text('space_id').references(() => spaces.id, { onDelete: 'set null' }),
    ownerId: text('owner_id').references(() => user.id, { onDelete: 'set null' }),
    title: text('title').notNull(),
    category: text('category').notNull(),
    status: workflowStatusEnum('status').default('not_started').notNull(),
    progress: integer('progress').default(0).notNull(),
    startsAt: timestamp('starts_at', { withTimezone: true }),
    dueAt: timestamp('due_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    inspectionResult: text('inspection_result'),
    notes: text('notes'),
    ...timestamps,
  },
  table => [index('construction_project_status_idx').on(table.projectId, table.status)],
);

export const tasks = pgTable(
  'task',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
    stageId: text('stage_id').references(() => projectStages.id, { onDelete: 'set null' }),
    parentId: text('parent_id'),
    createdBy: text('created_by').references(() => user.id, { onDelete: 'set null' }),
    assigneeId: text('assignee_id').references(() => user.id, { onDelete: 'set null' }),
    title: text('title').notNull(),
    description: text('description'),
    status: taskStatusEnum('status').default('todo').notNull(),
    priority: priorityEnum('priority').default('medium').notNull(),
    startsAt: timestamp('starts_at', { withTimezone: true }),
    dueAt: timestamp('due_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    labels: jsonb('labels').$type<string[]>().default([]).notNull(),
    ...timestamps,
  },
  table => [
    index('task_org_status_idx').on(table.organizationId, table.status),
    index('task_project_idx').on(table.projectId),
    index('task_assignee_idx').on(table.assigneeId),
  ],
);

export const files = pgTable(
  'file',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
    uploadedBy: text('uploaded_by').references(() => user.id, { onDelete: 'set null' }),
    folderId: text('folder_id'),
    name: text('name').notNull(),
    mimeType: text('mime_type').notNull(),
    sizeBytes: integer('size_bytes').notNull(),
    storageKey: text('storage_key').notNull(),
    checksum: text('checksum'),
    visibility: visibilityEnum('visibility').default('team').notNull(),
    version: integer('version').default(1).notNull(),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  table => [
    uniqueIndex('file_org_storage_uidx').on(table.organizationId, table.storageKey),
    index('file_project_idx').on(table.projectId),
  ],
);

export const comments = pgTable(
  'comment',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
    authorId: text('author_id').references(() => user.id, { onDelete: 'set null' }),
    parentId: text('parent_id'),
    entityType: text('entity_type').notNull(),
    entityId: text('entity_id').notNull(),
    body: text('body').notNull(),
    visibility: visibilityEnum('visibility').default('team').notNull(),
    resolvedAt: timestamp('resolved_at', { withTimezone: true }),
    ...timestamps,
  },
  table => [
    index('comment_entity_idx').on(table.organizationId, table.entityType, table.entityId),
    index('comment_project_idx').on(table.projectId),
  ],
);

export const notifications = pgTable(
  'notification',
  {
    id: id(),
    organizationId: text('organization_id').references(() => organization.id, {
      onDelete: 'cascade',
    }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    title: text('title').notNull(),
    body: text('body'),
    href: text('href'),
    readAt: timestamp('read_at', { withTimezone: true }),
    data: jsonb('data').$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  table => [index('notification_user_read_idx').on(table.userId, table.readAt)],
);

export const portalLinks = pgTable(
  'portal_link',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    projectId: text('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    clientId: text('client_id').references(() => clients.id, { onDelete: 'set null' }),
    createdBy: text('created_by').references(() => user.id, { onDelete: 'set null' }),
    tokenHash: text('token_hash').notNull(),
    label: text('label'),
    permissions: jsonb('permissions').$type<string[]>().default(['read']).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    lastAccessedAt: timestamp('last_accessed_at', { withTimezone: true }),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    ...timestamps,
  },
  table => [
    uniqueIndex('portal_token_hash_uidx').on(table.tokenHash),
    index('portal_project_idx').on(table.projectId),
  ],
);

export const aiJobs = pgTable(
  'ai_job',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
    requestedBy: text('requested_by').references(() => user.id, { onDelete: 'set null' }),
    type: text('type').notNull(),
    provider: text('provider'),
    model: text('model'),
    status: aiJobStatusEnum('status').default('queued').notNull(),
    idempotencyKey: text('idempotency_key').notNull(),
    prompt: text('prompt'),
    input: jsonb('input').$type<Record<string, unknown>>().default({}).notNull(),
    output: jsonb('output').$type<Record<string, unknown>>(),
    errorCode: text('error_code'),
    errorMessage: text('error_message'),
    progress: integer('progress').default(0).notNull(),
    startedAt: timestamp('started_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    cancelledAt: timestamp('cancelled_at', { withTimezone: true }),
    ...timestamps,
  },
  table => [
    uniqueIndex('ai_job_idempotency_uidx').on(table.organizationId, table.idempotencyKey),
    index('ai_job_org_status_idx').on(table.organizationId, table.status),
    index('ai_job_project_idx').on(table.projectId),
  ],
);

export const activityLogs = pgTable(
  'activity_log',
  {
    id: id(),
    organizationId: text('organization_id').references(() => organization.id, {
      onDelete: 'cascade',
    }),
    actorId: text('actor_id').references(() => user.id, { onDelete: 'set null' }),
    action: text('action').notNull(),
    entityType: text('entity_type').notNull(),
    entityId: text('entity_id'),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  table => [
    index('activity_org_created_idx').on(table.organizationId, table.createdAt),
    index('activity_entity_idx').on(table.entityType, table.entityId),
  ],
);

export const subscriptions = pgTable(
  'subscription',
  {
    id: id(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    provider: text('provider').default('manual').notNull(),
    providerCustomerId: text('provider_customer_id'),
    providerSubscriptionId: text('provider_subscription_id'),
    plan: studioPlanEnum('plan').notNull(),
    status: subscriptionStatusEnum('status').default('trialing').notNull(),
    seatCount: integer('seat_count').default(1).notNull(),
    currency: text('currency').default('CNY').notNull(),
    amount: numeric('amount', { precision: 14, scale: 2 }).default('0').notNull(),
    interval: text('interval').default('month').notNull(),
    currentPeriodStartsAt: timestamp('current_period_starts_at', { withTimezone: true }),
    currentPeriodEndsAt: timestamp('current_period_ends_at', { withTimezone: true }),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  table => [
    uniqueIndex('subscription_org_uidx').on(table.organizationId),
    uniqueIndex('subscription_provider_uidx').on(
      table.provider,
      table.providerSubscriptionId,
    ),
  ],
);

export const billingEvents = pgTable(
  'billing_event',
  {
    id: id(),
    provider: text('provider').notNull(),
    providerEventId: text('provider_event_id').notNull(),
    type: text('type').notNull(),
    organizationId: text('organization_id').references(() => organization.id, {
      onDelete: 'set null',
    }),
    payload: jsonb('payload').$type<Record<string, unknown>>().notNull(),
    processedAt: timestamp('processed_at', { withTimezone: true }),
    error: text('error'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  table => [
    uniqueIndex('billing_event_provider_uidx').on(table.provider, table.providerEventId),
    index('billing_event_org_idx').on(table.organizationId),
  ],
);
