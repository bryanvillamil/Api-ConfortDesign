import {DefaultCrudRepository} from '@loopback/repository';
import {Project, ProjectRelations} from '../models';
import {DbConfortDesignDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {
  constructor(
    @inject('datasources.DBConfortDesign') dataSource: DbConfortDesignDataSource,
  ) {
    super(Project, dataSource);
  }
}
