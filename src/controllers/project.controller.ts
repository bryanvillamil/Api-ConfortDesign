import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Project } from '../models';
import { ProjectRepository } from '../repositories';

export class ProjectController {
  constructor(
    @repository(ProjectRepository)
    public projectRepository: ProjectRepository,
  ) { }

  @post('/projects', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Project) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {
            title: 'NewProject',
            exclude: ['id'],
          }),
        },
      },
    })
    project: Omit<Project, 'id'>,
  ): Promise<{}> {
    const postProject = await this.projectRepository.create(project);
    return {
      statusCode: 200,
      response: postProject,
    };
  }

  @get('/projects', {
    responses: {
      '200': {
        description: 'Array of Project model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Project, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Project)) filter?: Filter<Project>,
  ): Promise<{}> {
    const project = await this.projectRepository.find(filter);
    return {
      statusCode: 200,
      response: project,
    };
  }

  @patch('/projects', {
    responses: {
      '200': {
        description: 'Project PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, { partial: true }),
        },
      },
    })
    project: Project,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.projectRepository.updateAll(project, where);
  }

  @get('/projects/{id}', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Project, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Project)) filter?: Filter<Project>
  ): Promise<{}> {
    const projectById = await this.projectRepository.findById(id, filter);
    return {
      statusCode: 200,
      response: projectById,
    };
  }

  @patch('/projects/{id}', {
    responses: {
      '204': {
        description: 'Project PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, { partial: true }),
        },
      },
    })
    project: Project,
  ): Promise<{}> {
    const patchProjectById = await this.projectRepository.updateById(id, project);
    return {
      statusCode: 200,
      response: patchProjectById,
    };
  }

  @put('/projects/{id}', {
    responses: {
      '204': {
        description: 'Project PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() project: Project,
  ): Promise<{}> {
    const putProject = await this.projectRepository.replaceById(id, project);
    return {
      statusCode: 200,
      response: putProject,
    };
  }

  @del('/projects/{id}', {
    responses: {
      '204': {
        description: 'Project DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<{}> {
    const deleteProject = await this.projectRepository.deleteById(id);
    return {
      statusCode: 200,
      response: deleteProject,
    };
  }
}
