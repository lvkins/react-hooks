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

import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 * Similar to useEffect except that it doesn't get called on initial render.
 * @param {React.EffectCallback} effect
 * @param {React.DependencyList} deps
 */
const useChangeEffect = (effect: EffectCallback, deps?: DependencyList) => {
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        return effect();
    }, deps);
};

export default useChangeEffect;
