import { describe, expect, it } from 'vitest';
import { studioRoles } from './permissions';

describe('studio RBAC boundaries', () => {
  it('allows owners to administer billing and the organization', () => {
    expect(studioRoles.owner.authorize({
      billing: ['update'],
      organization: ['delete'],
    }).success).toBe(true);
  });

  it('keeps financial data hidden from designers and viewers', () => {
    expect(studioRoles.designer.authorize({ finance: ['read'] }).success).toBe(false);
    expect(studioRoles.viewer.authorize({ finance: ['read'] }).success).toBe(false);
  });

  it('lets finance approve fees without editing design work', () => {
    expect(studioRoles.finance.authorize({ finance: ['approve'] }).success).toBe(true);
    expect(studioRoles.finance.authorize({ design: ['update'] }).success).toBe(false);
  });

  it('gives viewers read-only project access', () => {
    expect(studioRoles.viewer.authorize({ project: ['read'] }).success).toBe(true);
    expect(studioRoles.viewer.authorize({ project: ['update'] }).success).toBe(false);
  });
});
