/*
 * @Author: Witt
 * @Date: 2018-10-17 14:13:40
 * @Last Modified by: Witt
 * @Last Modified time: 2018-10-17 16:08:34
 */

import { TaskFunc, TaskNode } from './task_node';
import { LinkFunc, TaskLink } from './task_link';
import { CommandContext } from '../command_context';

/**
 * 任务执行流程
 */
class TaskFlow {

  /**
   * 节点集合
   */
  private nodes: TaskNode[] = [];

  /**
   * 边集合
   */
  private links: TaskLink[] = [];


  // #region 节点操作

  /**
   * 添加节点
   */
  public addNode(name: string, func: TaskFunc): void {
    const node = new TaskNode(name, func);
    this.nodes.push(node);
  }

  /**
   * 在目标节点之前插入一个节点
   * @param target 目标节点名称
   * @param name 名称
   * @param func 函数
   */
  public insertNode(target: string, name: string, func: TaskFunc): void {
    const index = this.findNodeIndex(target);
    const node = this.createNode(name, func);
    this.nodes.splice(index, 0, node);
  }

  /**
   * 在目标节点之前插入一个节点
   */
  public appendNode(target: string, name: string, func: TaskFunc) {
    const index = this.findNodeIndex(target) + 1;
    const node = this.createNode(name, func);
    this.nodes.splice(index, 0, node);
  }

  /**
   * 获取节点索引
   * @param name 名称
   */
  private findNodeIndex(name: string): number {
    return this.nodes.findIndex((node: TaskNode) => {
      return node.name === name;
    });
  }

  /**
   * 创建任务节点
   * @param name 名称
   * @param func 函数
   */
  private createNode(name: string, func: TaskFunc): TaskNode {
    const node = new TaskNode(name, func);
    return node;
  }

  // #endregion


  // #region 链接操作

  /**
   * 添加链接
   * @param name 名称
   * @param func 函数
   */
  public addLink(from: string, to: string, condition: string | boolean) {
    const link = this.createLink(from, to, condition);
    this.links.push(link);
  }

  /**
   * 创建链接
   */
  private createLink(from: string, to: string, condition: string | boolean) {
    const link = new TaskLink(from, to, condition);
    return link;
  }

  // #endregion


  // #region 流程控制
  /**
   * 获取下一个节点
   * @param from    源节点名称
   * @param context 上下文
   */
  getNext(from?: string, context?: CommandContext): TaskNode {
    if (!from) {
      return this.nodes.shift();
    }

    // 符合满足条件的边
    const nextLink = this.links.find((link: TaskLink) => {
      return link.from === from && link.canLink(context);
    });
    if (!nextLink) {
      return;
    }

    return this.nodes.find((node: TaskNode) => {
      return node.name === nextLink.to;
    });
  }

  // #endregion
}

export { TaskFlow };
