import type { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
        </p>
      );

    case 'group':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          Project exercises: {part.groupProjectCount}
        </p>
      );

    case 'background':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          Material:{' '}
          <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );

    case 'special':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          Required skills: {part.requirements.join(', ')}
        </p>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
