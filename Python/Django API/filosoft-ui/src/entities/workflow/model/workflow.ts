export interface WFNode {
  id: string;
  uniqueCode: string;
  name: string;
  type: string;
  x: number;
  y: number;
  configuration?: Record<string, unknown> | null;
  inputPorts?: string[];
  outputPorts?: string[];
}

export interface WFConnection {
  id: string;
  sourceNodeId: string;
  sourcePort: string;
  targetNodeId: string;
  targetPort: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt?: string | null;
  nodes: WFNode[];
  connections: WFConnection[];
}

export interface NodeType {
  type: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  inputPorts: string[];
  outputPorts: string[];
}
