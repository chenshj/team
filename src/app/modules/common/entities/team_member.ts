import { Entity, NgField } from '../../../../devkit';

export class TeamMember {

  @NgField(true)
  id: string;

  @NgField()
  firstName: string;

  @NgField()
  lastName: string;

  @NgField()
  avatar: string;
}
