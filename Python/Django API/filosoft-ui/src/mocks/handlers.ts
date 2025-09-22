import { http, HttpResponse } from "msw";
import { usersSeed } from "./seed/users";
import { rolesDb } from "./seed/roles";
import { wfSeed, nodeTypesSeed } from "./seed/workflows";
import type { Workflow } from "@/entities/workflow/model/workflow";
import type {
  CreateWorkflowRequest,
  UpdateWorkflowRequest,
} from "@/entities/workflow/model/dto";

let workflows: Workflow[] = [...wfSeed];

const userRoles: Record<string, string[]> = {};
for (const u of usersSeed)
  if (!userRoles[u.id])
    userRoles[u.id] = Math.random() < 0.2 ? ["Admin"] : ["User"];

export const handlers = [
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  http.get("*/api/v1/auth/All/:page/:pageSize", ({ params, request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.toLowerCase() || "";
    const sortBy = url.searchParams.get("sortBy") || "name";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";
    const page = Number(params.page);
    const pageSize = Number(params.pageSize);

    const filtered = usersSeed.filter(
      (u) =>
        u.userName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
    filtered.sort((a, b) => {
      const av = sortBy === "email" ? a.email : a.userName;
      const bv = sortBy === "email" ? b.email : b.userName;
      return sortOrder === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    const pages = Math.max(1, Math.ceil(total / pageSize));

    return HttpResponse.json({ items, page, pageSize, total, pages });
  }),

  http.get("*/api/v1/auth/roles", () => HttpResponse.json(rolesDb)),

  http.get("*/api/v1/auth/:id/roles", ({ params }) => {
    const id = String(params.id);
    const names = userRoles[id] || [];
    const res = rolesDb.filter((r) => names.includes(r.name));
    return HttpResponse.json(res);
  }),

  http.post("*/api/v1/auth/:id/roles", async ({ params, request }) => {
    const id = String(params.id);
    const body = (await request.json()) as { roles: string[] };
    userRoles[id] = body.roles;
    return HttpResponse.json({ ok: true });
  }),

  http.get("*/api/v1/roles/:page/:pageSize", ({ params, request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.toLowerCase() || "";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";
    const page = Number(params.page);
    const pageSize = Number(params.pageSize);

    const filtered = rolesDb.filter((r) => r.name.toLowerCase().includes(q));
    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    const pages = Math.max(1, Math.ceil(total / pageSize));
    return HttpResponse.json({ items, page, pageSize, total, pages });
  }),

  http.post("*/api/v1/roles", async ({ request }) => {
    const body = (await request.json()) as { name: string };
    const exists = rolesDb.some(
      (r) => r.name.toLowerCase() === body.name.toLowerCase()
    );
    if (exists)
      return HttpResponse.json({ message: "exists" }, { status: 409 });
    const id = "r" + (rolesDb.length + 1);
    rolesDb.push({ id, name: body.name });
    return HttpResponse.json({ id, name: body.name });
  }),

  http.put("*/api/v1/roles/:id", async ({ params, request }) => {
    const id = String(params.id);
    const body = (await request.json()) as { name: string };
    const idx = rolesDb.findIndex((r) => r.id === id);
    if (idx < 0) return HttpResponse.json({}, { status: 404 });
    const old = rolesDb[idx].name;
    rolesDb[idx].name = body.name;
    for (const uid of Object.keys(userRoles))
      userRoles[uid] = (userRoles[uid] || []).map((n) =>
        n === old ? body.name : n
      );
    return HttpResponse.json(rolesDb[idx]);
  }),

  http.delete("*/api/v1/roles/:id", ({ params }) => {
    const id = String(params.id);
    const idx = rolesDb.findIndex((r) => r.id === id);
    if (idx < 0) return HttpResponse.json({}, { status: 404 });
    const [removed] = rolesDb.splice(idx, 1);
    for (const uid of Object.keys(userRoles))
      userRoles[uid] = (userRoles[uid] || []).filter((n) => n !== removed.name);
    return HttpResponse.json({ ok: true });
  }),
];
handlers.push(
  http.get("*/api/workflow/:page/:pageSize", ({ params, request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.toLowerCase() || "";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";
    const page = Number(params.page);
    const pageSize = Number(params.pageSize);

    const filtered = workflows.filter((w) => w.name.toLowerCase().includes(q));
    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    const pages = Math.max(1, Math.ceil(total / pageSize));
    return HttpResponse.json({ items, page, pageSize, total, pages });
  }),

  http.get("*/api/workflow/:id", ({ params }) => {
    const id = String(params.id);
    const item = workflows.find((x) => x.id === id);
    if (!item) return HttpResponse.json({}, { status: 404 });
    return HttpResponse.json(item);
  }),

  http.post("*/api/workflow", async ({ request }) => {
    const body = (await request.json()) as CreateWorkflowRequest;
    const created: Workflow = {
      id: crypto.randomUUID(),
      name: body.name,
      description: body.description || "",
      isActive: true,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      nodes: body.nodes,
      connections: body.connections,
    };
    workflows.unshift(created);
    return HttpResponse.json(created);
  }),

  http.put("*/api/workflow/:id", async ({ params, request }) => {
    const id = String(params.id);
    const body = (await request.json()) as UpdateWorkflowRequest;
    const idx = workflows.findIndex((x) => x.id === id);
    if (idx < 0) return HttpResponse.json({}, { status: 404 });
    workflows[idx] = {
      ...workflows[idx],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(workflows[idx]);
  }),

  http.delete("*/api/workflow/:id", ({ params }) => {
    const id = String(params.id);
    workflows = workflows.filter((w) => w.id !== id);
    return HttpResponse.json({ ok: true });
  }),

  http.get("*/api/plugin/nodes", () => HttpResponse.json(nodeTypesSeed))
);
