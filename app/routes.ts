import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("listing", "routes/listing.tsx"),
    route("single/:id", "routes/singleItem.tsx"),

]satisfies RouteConfig;
