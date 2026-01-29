// vite.config.mjs
import { defineConfig } from "file:///C:/Users/Cao/Desktop/cashbook/CashBook-Demo-React/node_modules/.pnpm/vite@4.5.14_@types+node@16.18.126_sass@1.97.3_terser@5.46.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Cao/Desktop/cashbook/CashBook-Demo-React/node_modules/.pnpm/@vitejs+plugin-react@5.1.2_vite@4.5.14_@types+node@16.18.126_sass@1.97.3_terser@5.46.0_/node_modules/@vitejs/plugin-react/dist/index.js";
import svgr from "file:///C:/Users/Cao/Desktop/cashbook/CashBook-Demo-React/node_modules/.pnpm/vite-plugin-svgr@4.5.0_rollup@2.79.2_typescript@4.9.5_vite@4.5.14_@types+node@16.18.126_sass@1.97.3_terser@5.46.0_/node_modules/vite-plugin-svgr/dist/index.js";
import path from "path";
import { createSvgIconsPlugin } from "file:///C:/Users/Cao/Desktop/cashbook/CashBook-Demo-React/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.5.14_@types+node@16.18.126_sass@1.97.3_terser@5.46.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var vite_config_default = defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icon")],
      symbolId: "icon-[name]",
      inject: "body-last"
    })
  ],
  resolve: {
    alias: {
      "hooks": path.resolve(process.cwd(), "src/hooks"),
      "components": path.resolve(process.cwd(), "src/components"),
      "views": path.resolve(process.cwd(), "src/views"),
      "icon": path.resolve(process.cwd(), "src/icon"),
      "utils": path.resolve(process.cwd(), "src/utils")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQ2FvXFxcXERlc2t0b3BcXFxcY2FzaGJvb2tcXFxcQ2FzaEJvb2stRGVtby1SZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQ2FvXFxcXERlc2t0b3BcXFxcY2FzaGJvb2tcXFxcQ2FzaEJvb2stRGVtby1SZWFjdFxcXFx2aXRlLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0Nhby9EZXNrdG9wL2Nhc2hib29rL0Nhc2hCb29rLURlbW8tUmVhY3Qvdml0ZS5jb25maWcubWpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogJy8nLFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBzdmdyKCksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9pY29uJyldLFxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtuYW1lXScsXG4gICAgICBpbmplY3Q6ICdib2R5LWxhc3QnLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdob29rcyc6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2hvb2tzJyksXG4gICAgICAnY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgICd2aWV3cyc6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL3ZpZXdzJyksXG4gICAgICAnaWNvbic6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2ljb24nKSxcbiAgICAgICd1dGlscyc6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL3V0aWxzJyksXG4gICAgfVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVYsU0FBUyxvQkFBb0I7QUFDaFgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFDakIsU0FBUyw0QkFBNEI7QUFFckMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wscUJBQXFCO0FBQUEsTUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxVQUFVLENBQUM7QUFBQSxNQUNsRCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsU0FBUyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsV0FBVztBQUFBLE1BQ2hELGNBQWMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGdCQUFnQjtBQUFBLE1BQzFELFNBQVMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLFdBQVc7QUFBQSxNQUNoRCxRQUFRLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxVQUFVO0FBQUEsTUFDOUMsU0FBUyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsV0FBVztBQUFBLElBQ2xEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
