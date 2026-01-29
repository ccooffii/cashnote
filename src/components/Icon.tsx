import React from 'react';
import classNames from 'classnames';

interface Props extends React.SVGAttributes<SVGElement> {
    name: string;
    className?: string;
}

/**
 * Vite + vite-plugin-svg-sprite 方案：
 * 1. 插件会自动将 src/icon/*.svg 合并为雪碧图，注入到页面。
 * 2. 组件通过 <use href="#icon-xxx" /> 引用。
 * 3. name 传入 svg 文件名（不含扩展名），如 name="chart" 对应 src/icon/chart.svg。
 */
const Icon: React.FC<Props> = ({ name, className, ...restProps }) => {
    return (
        <svg className={classNames('icon', className)} {...restProps}>
            {/* Vite 方案：vite-plugin-svg-sprite 默认 symbolId 为 icon-[name] */}
            <use href={`#icon-${name}`} />
        </svg>
    );
};

export default Icon;