import { z } from "zod";

export const CreateCampaignsRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional()
});

export const UpdateCampaignsRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
});

export const GetCampaignLeadsRequestSchema = z.object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
    name: z.string().optional(),
    status: z.enum([
        'New',
        'Engaged',
        'FollowUp_Scheduled',
        'Contacted',
        'Qualified',
        'Converted',
        'Unresponsive',
        'Disqualified',
        'Re_Engaged',
        'Opted_out'
    ]).optional(),
    sortBy: z.enum(["name", "createdAt"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
});

export const addLeadRequestSchema = z.object({
leadId: z.number(),
status: z.enum([
    'New',
    'Engaged',
    'FollowUp_Scheduled',
    'Contacted',
    'Qualified',
    'Converted',
    'Unresponsive',
    'Disqualified',
    'Re_Engaged',
    'Opted_out'
]).optional(),
});


export const UpdateLeadStatusRequestSchema = z.object({
    status: z.enum([
        'New',
        'Engaged',
        'FollowUp_Scheduled',
        'Contacted',
        'Qualified',
        'Converted',
        'Unresponsive',
        'Disqualified',
        'Re_Engaged',
        'Opted_out'
    ])
})