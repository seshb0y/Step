import type { WFNode, WFConnection } from "./workflow";

export interface CreateWorkflowRequest {
  name: string;
  description?: string;
  nodes: WFNode[];
  connections: WFConnection[];
}

export interface UpdateWorkflowRequest {
  name: string;
  description?: string;
  nodes: WFNode[];
  connections: WFConnection[];
}
