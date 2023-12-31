"use client";
import { ChangeEvent } from "react";
import { createNewProject } from "@/lib/api";
import { create } from "domain";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";

// set react modal
Modal.setAppElement("#modal");

const NewProject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [name, setName] = useState("");

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createNewProject(name);
        closeModal();
    };

    return (
        <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
            <Button onClick={() => openModal()}>+ New Project</Button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-3/4 bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6">New Project</h1>
                <form className="flex items-center" onSubmit={handleSubmit}>
                    <Input
                        placeholder="project name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Modal>
        </div>
    );
};

export default NewProject;
