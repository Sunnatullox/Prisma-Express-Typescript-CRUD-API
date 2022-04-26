"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(422).json({ error: "Name or email or password  not found Fill in the inputs" });
        return;
    }
    try {
        const user = yield prisma.user.create({
            data: {
                name, email, password
            }
        });
        res.status(200).json(user);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred on the server" });
    }
}));
router.post('/createUsers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usersList } = req.body;
    if (!usersList) {
        res.status(422).json({ error: "Name or email or password  not found Fill in the inputs" });
        return;
    }
    try {
        const users = yield prisma.user.createMany({
            data: usersList
        });
        res.status(200).json(users);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred on the server" });
    }
}));
router.post('/createCars', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carsList } = req.body;
    if (!carsList) {
        res.status(422).json({ error: "Name or email or password  not found Fill in the inputs" });
        return;
    }
    try {
        const cars = yield prisma.car.createMany({
            data: carsList
        });
        res.status(200).json(cars);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred on the server" });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            include: { cars: true }
        });
        !users && res.status(404).json({ msg: "users not found" });
        res.status(200).json(users);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred on the server" });
        return;
    }
}));
router.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        !user && res.status(404).json({ msg: "users not found" });
        res.status(200).json(user);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred on the server" });
        return;
    }
}));
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (!name || !email) {
        res.status(422).json({ error: "Name or eamil not found Fill in the inputs" });
        return;
    }
    try {
        const updateUser = yield prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name, email, password
            }
        });
        return res.status(200).json(updateUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred on the server" });
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteUser = yield prisma.user.delete({ where: { id: Number(id) } });
        return deleteUser && res.status(200).json({ msg: "User deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred on the server" });
    }
}));
exports.default = router;
