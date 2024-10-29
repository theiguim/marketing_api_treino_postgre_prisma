import { Handler } from "express";
import { prisma } from "../database";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadsRequestSchemas";
import { HttpError } from "../Error/HttpError";
import { Prisma } from "@prisma/client";

export class LeadsController {
    index: Handler = async (req, res, next) => {
        try {
            const query = GetLeadsRequestSchema.parse(req.query);

            const {page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc"} = query;
            const pageNumber = +page
            const pageSizeNumber = +pageSize

            const where: Prisma.LeadWhereInput = {}

            if(name) where.name = {contains: name, mode:"insensitive"}
            if(status) where.status = status

            const leads = await prisma.lead.findMany({
                where,
                skip: (pageNumber - 1) * pageSizeNumber,
                orderBy: {[sortBy]: order}
            })

            const total = await prisma.lead.count({where})

            res.status(200).json({
                data: leads,
                meta:{
                    page:pageNumber,
                    pageSize: pageSizeNumber,
                    total,
                    totalPages: Math.ceil(total/pageSizeNumber)
                }
            })

        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {

            const body = CreateLeadRequestSchema.parse(req.body);

            const newLead = await prisma.lead.create({
                data: body
            });
            res.status(200).json(newLead)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {

            const lead = await prisma.lead.findUnique({
                where: {
                    id: +req.params.id
                },
                include: {
                    grups: true,
                    campaigns: true
                }
            });

            if (!lead) throw new HttpError(404, "lead não encontrado");

            res.status(200).json(lead);

        } catch (error) {
            next(error)
        }
    }

    updade: Handler = async (req, res, next) => {
        try {

            const body = UpdateLeadRequestSchema.parse(req.body);

            const leadExists = await prisma.lead.findUnique({where: {id: +req.params.id}});
            if(!leadExists) throw new HttpError(404, "lead não encontrado");

            const updatedLead = await prisma.lead.update({
                data: body,
                where: {
                    id: +req.params.id
                }
            });

            res.status(200).json(updatedLead)

        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {

            const leadExists = await prisma.lead.findUnique({where: {id: +req.params.id}});
            if(!leadExists) throw new HttpError(404, "lead não encontrado");

            const deletedLead = await prisma.lead.delete({ where: { id: +req.params.id } });

            res.status(200).json({ message: "Item deletado com sucesso." });
        } catch (error) {
            next(error)
        }
    }
}