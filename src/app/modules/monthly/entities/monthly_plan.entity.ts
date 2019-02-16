import { Entity, NgField } from '../../../../devkit';
import { TeamMember } from '../../common/entities/team_member';

export class MonthlyPlan extends Entity {

  @NgField({
    primary: true
  })
  id: string;

  @NgField()
  month: string;

  @NgField()
  title: string;

  @NgField()
  brief: string;

  @NgField()
  priority: number;

  @NgField()
  status: string;

  @NgField()
  owner: TeamMember;

  @NgField()
  creator: TeamMember;

  @NgField()
  creationTime: string;

  @NgField()
  lastModifier: TeamMember;

  @NgField()
  lastModifyTime: string;
}
