"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type PengaturanContextType = {
    isHaveAsrama: boolean;
    setIsHaveAsrama: (value: boolean) => void;
    kelompok: string;
    setKelompok: (value: string) => void;
};

const PengaturanContext = createContext<PengaturanContextType | undefined>(
    undefined
);

export const PengaturanProvider = ({ children }: { children: ReactNode }) => {
    const [isHaveAsrama, setIsHaveAsrama] = useState(false);
    const [kelompok, setKelompok] = useState("asrama");

    return (
        <PengaturanContext.Provider
            value={{ isHaveAsrama, setIsHaveAsrama, kelompok, setKelompok }}
        >
            {children}
        </PengaturanContext.Provider>
    );
};

export const usePengaturan = () => {
    const context = useContext(PengaturanContext);
    if (!context) {
        throw new Error("usePengaturan harus dipakai dalam PengaturanProvider");
    }
    return context;
};
