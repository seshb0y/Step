import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  useWorkflow,
  useNodeTypes,
} from "@/entities/workflow/model/useWorkflows";
import {
  useCreateWorkflow,
  useUpdateWorkflow,
} from "@/features/workflow/hooks";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { WFNode, WFConnection } from "@/entities/workflow/model/workflow";

type FlowNodeData = { label: string };
type FlowNode = Node<FlowNodeData>;

export default function DesignerPage() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: wf } = useWorkflow(isNew ? null : (id as string));
  const { data: nodeTypes } = useNodeTypes();
  const create = useCreateWorkflow();
  const update = useUpdateWorkflow();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (!isNew && wf) {
      setName(wf.name);
      setDescription(wf.description);
    }
  }, [wf, isNew]);

  const initialNodes = useMemo<FlowNode[]>(() => {
    if (!wf) return [];
    return wf.nodes.map((n) => ({
      id: n.id,
      data: { label: n.name },
      position: { x: n.x, y: n.y },
      type: "default",
    }));
  }, [wf]);

  const initialEdges = useMemo<Edge[]>(() => {
    if (!wf) return [];
    return wf.connections.map((c) => ({
      id: c.id,
      source: c.sourceNodeId,
      target: c.targetNodeId,
    }));
  }, [wf]);

  const [nodes, setNodes, onNodesChange] =
    useNodesState<FlowNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  function addNode(type: string, nodeName: string) {
    const n: FlowNode = {
      id: crypto.randomUUID(),
      data: { label: nodeName },
      position: { x: 120 + nodes.length * 40, y: 140 },
      type: "default",
    };
    setNodes((ns) => ns.concat(n));
  }

  async function onSave() {
    const dtoNodes: WFNode[] = nodes.map((n) => ({
      id: n.id,
      uniqueCode: n.id,
      name: n.data.label,
      type: "Default",
      x: n.position.x,
      y: n.position.y,
      configuration: null,
      inputPorts: [],
      outputPorts: [],
    }));
    const dtoEdges: WFConnection[] = edges.map((e) => ({
      id: e.id,
      sourceNodeId: String(e.source),
      sourcePort: "out",
      targetNodeId: String(e.target),
      targetPort: "in",
    }));
    if (isNew) {
      const created = await create({
        name: name || "New Workflow",
        description: description || "",
        nodes: dtoNodes,
        connections: dtoEdges,
      });
      navigate(`/workflow/${created.id}`);
    } else {
      await update(id as string, {
        name: name || (wf?.name ?? ""),
        description: description || (wf?.description ?? ""),
        nodes: dtoNodes,
        connections: dtoEdges,
      });
    }
  }

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full max-w-xl">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            {t("cancel")}
          </Button>
          <Button onClick={onSave}>{t("save")}</Button>
        </div>
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-3 min-h-[70vh]">
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 overflow-auto">
          <div className="text-sm font-medium mb-2">Nodes</div>
          <div className="space-y-2">
            {nodeTypes?.map((nt) => (
              <button
                key={nt.type}
                onClick={() => addNode(nt.type, nt.name)}
                className="w-full text-left px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {nt.name}
              </button>
            ))}
          </div>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <MiniMap zoomable pannable />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
