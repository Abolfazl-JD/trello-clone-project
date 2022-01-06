import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          done: false,
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          done: false,
        },
        {
          description: '',
          name: 'and thrid',
          id: uuid(),
          done: false,
        },
      ],
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          done: false,
        },
      ],
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          done: false,
        },
      ],
    },
  ],
}
