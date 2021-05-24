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

import { useEffect, useRef } from "react";

export interface UseEventListenerOptions {
    /**
     * The target subscriber object.
     *
     * @default {window}
     * @type {*}
     * @memberof UseEventListenerOptions
     */
    target?: any;
    /**
     * Refer to {https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener} options argument.
     *
     * @default {false}
     * @type {(boolean | AddEventListenerOptions)}
     * @memberof UseEventListenerOptions
    */
    options?: boolean | AddEventListenerOptions;
}

/**
 * A hook that provides a simple way to attach the event listeners.
 *
 * @template T
 * @template U
 * @param {T} name
 * @param {(e: U[T]) => any} handler
 * @param {UseEventListenerOptions} {
 *         target = window,
 *         options = false
 *     }
 */
function useEventListener<T extends keyof U, U = WindowEventMap & DocumentEventMap>
    (name: T, handler: (e: U[T]) => any, {
        target = window,
        options = false
    }: UseEventListenerOptions = {}): void {

    // Create a ref that stores handler
    const savedHandler = useRef<typeof handler>();

    // Use effect that updates reference handler if handler changes.
    // This will prevent below effect to re-run on every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    // Use effect that re-runs whenever event name changes
    useEffect(() => {
        // Ensure target can handle event listeners
        if (!target?.addEventListener) {
            return;
        }

        // Create event listener that calls handler function stored in ref
        const eventListener = (event: U[T]): void => savedHandler.current && savedHandler.current(event);

        // Add event listener
        target.addEventListener(name, eventListener, options);

        // Remove event listener on cleanup
        return () => {
            console.debug(`useEventListener(${name})::useEffect cleanup`);
            target.removeEventListener(name, eventListener, options);
        };
    }, [name]);
}

export default useEventListener;