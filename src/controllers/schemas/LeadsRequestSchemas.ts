import { z } from "zod";

export const GetLeadsRequestSchema = z.object({
page: z.string().optional(),
pageSize: z.string().optional(),
name: z.string().optional(),
status: z.enum([
    'New',
    'Contact',
    'Qualified',
    'Converted',
    'Unresponsive',
    'Disqualified',
    'Archived',
]).optional(),
sortBy: z.enum(["name", "status", "createdAt"]).optional(),
order: z.enum(["asc", "desc"]).optional()

});

export const CreateLeadRequestSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    status: z.enum([
        'New',
        'Contact',
        'Qualified',
        'Converted',
        'Unresponsive',
        'Disqualified',
        'Archived',
    ]).optional()
});

export const UpdateLeadRequestSchema = z.object({

    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    status: z.enum([
        'New',
        'Contact',
        'Qualified',
        'Converted',
        'Unresponsive',
        'Disqualified',
        'Archived',
    ]).optional()

});
