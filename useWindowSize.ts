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

import { useEffect, useState } from 'react';

export interface WindowSize {
    width: number;
    height: number;
}


/**
 * A hook that returns the interior window visual viewport dimensions.
 * @returns {WindowSize}
 */
const useWindowSize = (): WindowSize => {
    // Gets screen dimensions object
    const getSize = (): WindowSize => ({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [size, setSize] = useState<WindowSize>(getSize);

    useEffect(() => {
        // Handle resize event
        const onResize = () => setSize(getSize());

        // Create event listener
        window.addEventListener('resize', onResize);

        // Cleanup
        return () => { window.removeEventListener('resize', onResize); }
    }, []);

    return size;
}