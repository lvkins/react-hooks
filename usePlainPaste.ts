/*
 * Copyright (c) 2021. Łukasz Szwedt. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import React, { useCallback } from "react";

export interface UsePlainPasteHook {
    /**
     * The paste event callback.
     *
     * @memberof UsePlainPasteHook
     */
    onPaste: (e: React.ClipboardEvent<HTMLElement>) => void;
}

/** A hook that transforms pasting content into plain text at target element */
const usePlainPaste = (): UsePlainPasteHook => {
    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        // Abort default action
        e.stopPropagation();
        e.preventDefault();
        if (e.currentTarget instanceof HTMLElement) {
            // Get clipboard text
            const text = e.clipboardData.getData("text/plain");
            // Insert clipboard content as raw text
            document.execCommand("insertText", false, text);
        }
    }, []);

    return {
        onPaste: handlePaste
    };
};

export default usePlainPaste;
