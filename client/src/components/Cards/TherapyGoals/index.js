import * as T from '../../Typography';
import * as S from './style';
import { Textarea, Dropdown } from './../../Inputs';
import Icon from './../../Icon';
import { useState } from 'react';
import { dropdowns } from '../../../constants';

const TherapyGoals = ({
  error,
  handleChange,
  m, // margins
  goals,
  label,
  ...props
}) => {
  const [errors, setErrors] = useState({ goal: '', category: '' });

  const handleAdd = () => {
    // last item
    const { goal, category, id } = goals[goals.length - 1];
    // todo refactor validation
    if (!goal || !category) {
      const errors = {};
      if (!goal) {
        errors.goal = 'Required field';
      }
      if (!category) {
        errors.category = 'Required field';
      }
      return setErrors(errors);
    }
    setErrors({});

    handleChange([...goals, { goal: '', category: '', id: id + 1 }]);
  };

  const handleRemove = (_id) => {
    handleChange(goals.filter(({ id }) => _id !== id));
  };

  const handleGoalChange = (value, id) => {
    const newGoals = [...goals];
    const index = newGoals.findIndex((element) => element.id === id);
    newGoals[index].goal = value;
    handleChange(newGoals);
  };

  const handleCategoryChange = (value, id) => {
    const newGoals = [...goals];
    const index = newGoals.findIndex((element) => element.id === id);
    newGoals[index].category = value;
    handleChange(newGoals);
  };

  const isLastElement = (i) => {
    return i === goals.length - 1;
  };

  return (
    <S.Wrapper {...m}>
      <T.P color="gray9" m="0" mb="2">
        {label}
      </T.P>
      {goals.map(({ goal, category, id }, i) => (
        <S.CardWrapper key={id} error={error}>
          <Textarea
            placeholder="Goal..."
            m={{ mb: 4 }}
            value={goal}
            handleChange={(v) => handleGoalChange(v, id)}
            error={isLastElement(i) && errors.goal}
            autoSize={{ minRows: 1, maxRows: 6 }}
          />
          <Dropdown
            placeholder="Select a category"
            options={dropdowns.therapyGoalsCategories}
            selected={category}
            m={{ mb: 4 }}
            handleChange={(v) => handleCategoryChange(v, id)}
            error={isLastElement(i) && errors.category}
          />

          <S.ButtonsWrapper>
            {isLastElement(i) && (
              <S.Button onClick={handleAdd}>
                <Icon color="blue" width="16" height="16" icon="add" />
                <T.P color="blue" m="0" ml="2" bold>
                  Add goal
                </T.P>
              </S.Button>
            )}
            {goals.length !== 1 ? (
              <S.Button onClick={() => handleRemove(id)} right>
                <Icon color="pink" width="16" height="16" icon="bin" />
                <T.P color="pink" m="0" ml="2" bold>
                  Remove
                </T.P>
              </S.Button>
            ) : null}
          </S.ButtonsWrapper>
        </S.CardWrapper>
      ))}
      {error && (
        <T.P color="error" m="0" mt="0">
          {error}
        </T.P>
      )}
    </S.Wrapper>
  );
};

export default TherapyGoals;
