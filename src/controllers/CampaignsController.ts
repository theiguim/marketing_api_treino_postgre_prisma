import { Handler } from "express";
import { prisma } from "../database";
import { CreateCampaignsRequestSchema, UpdateCampaignsRequestSchema } from "./schemas/CampaignsRequestSchema";
import { HttpError } from "../Error/HttpError";

export class CampaignsController {

    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await prisma.campaign.findMany();
            res.status(200).json(campaigns);

        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignsRequestSchema.parse(req.body)
            const newCampaign = await prisma.campaign.create({
                data: body
            });

            res.status(200).json(newCampaign);

        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {

            const campaign = await prisma.campaign.findUnique({
                where: { id: +req.params.id },
                include: {
                    leads: {
                        include: {
                            lead: true
                        }
                    }
                }
            });

            if (!campaign) throw new HttpError(404, "Campanha não existe");

            res.status(200).json(campaign)

        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {

            const campaignExists = await prisma.campaign.findUnique({ where: { id: +req.params.id } })
            if (!campaignExists) throw new HttpError(404, "Campanha não existe");
            const body = UpdateCampaignsRequestSchema.parse(req.body);

            const updateCampaign = await prisma.campaign.update({
                data: body,
                where: { id: +req.params.id }
            });

            res.status(200).json(updateCampaign);

        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {

            const campaignExists = await prisma.campaign.findUnique({ where: { id: +req.params.id } })
            if (!campaignExists) throw new HttpError(404, "Campanha não existe");

            const deleteCampaign = await prisma.campaign.delete({
                where: { id: +req.params.id }
            });

            res.status(200).json("Deletado com sucesso.");

        } catch (error) {
            next(error)
        }
    }

};

