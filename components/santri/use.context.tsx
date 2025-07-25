"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AsramaContextType = {
    asramaId: number;
    setAsramaId: (id: number) => void;
};

const AsramaContext = createContext<AsramaContextType | undefined>(undefined);

export const AsramaProvider = ({ children }: { children: ReactNode }) => {
    const [asramaId, setAsramaId] = useState(1);

    return (
        <AsramaContext.Provider value={{ asramaId, setAsramaId }}>
            {children}
        </AsramaContext.Provider>
    );
};

export const useAsrama = () => {
    const context = useContext(AsramaContext);
    if (!context) {
        throw new Error("useAsramaId harus dipakai dalam AsramaProvider");
    }
    return context;
};
