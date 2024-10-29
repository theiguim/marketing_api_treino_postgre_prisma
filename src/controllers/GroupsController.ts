import { Handler } from "express";
import { prisma } from "../database";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupsRequestSchema";
import { HttpError } from "../Error/HttpError";

export class GroupsController {

    index: Handler = async (req, res, next) => {
        try {

            const groups = await prisma.group.findMany()

            res.status(200).json(groups);
        } catch (error) {
            next(error);
        }
    }

    create: Handler = async (req, res, next) => {
        try {

            const body = CreateGroupRequestSchema.parse(req.body);

            const newGroup = await prisma.group.create({
                data: body
            });

            res.status(200).json(newGroup);

        } catch (error) {
            next(error);
        }
    }
    show: Handler = async (req, res, next) => {
        try {

            const group = await prisma.group.findUnique({
                where: { id: +req.params.id },
                include: {
                    leads: true
                }
            });

            if (!group) throw new HttpError(404, "grupo não encontrado");

            res.status(201).json(group)

        } catch (error) {
            next(error);
        }
    }
    update: Handler = async (req, res, next) => {
        try {

            const groupExists = await prisma.group.findUnique({ where: { id: +req.params.id } });
            if (!groupExists) throw new HttpError(404, "Grupo não encontrado");

            const body = UpdateGroupRequestSchema.parse(req.body);

            const updatedGroup = await prisma.group.update({ data: body, where: { id: +req.params.id } });

            res.status(201).json(updatedGroup);

        } catch (error) {
            next(error);
        }
    }
    delete: Handler = async (req, res, next) => {
        try {

            const groupExists = await prisma.group.findUnique({ where: { id: +req.params.id } });
            if (!groupExists) throw new HttpError(404, "Grupo não encontrado");

            const deletedGroup = await prisma.group.delete({
                where: { id: +req.params.id }
            });

            res.status(201).json(deletedGroup);
        } catch (error) {
            next(error);
        }
    }



}