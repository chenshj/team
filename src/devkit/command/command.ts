/**
 * Command相关定义
 * @author Witt<jiwt@inspur.com>
 */

/**
 * 命令参数
 */
interface CommandParams {
  [key: string]: any;
}

/**
 * 命令接口
 */
interface Command {

  /**
   * 命令的名称，命令的唯一标识。
   */
  name: string;

  /**
   * 命令参数
   */
  params?: CommandParams;

}

export { CommandParams, Command };
