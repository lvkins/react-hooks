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

import { DependencyList, useCallback, useEffect, useRef, useState } from "react";
import useChangeEffect from "./useChangeEffect";

/**
 * A hook that debounces effect call to allow one execution per given delay.
 * @param {number} delay
 * @param {Function} effect
 * @param {DependencyList} deps
 * @returns {(...args) => void}
 */
const useAsyncDebounce = (delay: number, effect: Function, deps: DependencyList) => {
    const callback = useRef<Function>();
    const callbackArgs = useRef<any[]>();
    const [lastRun, setLastRun] = useState(0);

    // Update callback
    useEffect(() => { callback.current = effect; }, [deps]);

    useChangeEffect(() => {
        const handler = setTimeout(() => { callback.current?.apply(null, callbackArgs.current); }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [lastRun, delay]);

    // Return a callback that will trigger an update
    return useCallback((...args) => {
        // Update args
        callbackArgs.current = args;
        // Trigger update
        setLastRun(Date.now());
    }, []);
};

export default useAsyncDebounce;