
import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '../../../../devkit';
import { ListRepositoryService } from '../../../../farris-command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'loadData'
})
export class LoadDataHandler extends CommandHandler {

  constructor(private repositoryService: ListRepositoryService) {
    super();
  }

  schedule() {
    // this.repositoryService.load().subscribe();
    this.addTask('loadData', (context: CommandContext) => {
      return this.repositoryService.load();
      // const instance = this.repositoryService;
      // const method = 'load';
      // const args = [];
      // return this.invoke(instance, method, args, context);
    });
  }
}
