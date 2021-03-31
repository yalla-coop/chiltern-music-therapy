import * as T from '../../Typography';
import * as S from './style';
import { Textarea, Dropdown } from './../../Inputs';
import Icon from './../../Icon';
import { useState } from 'react';
import { dropdowns } from '../../../constants';

const TherapyGoals = ({
  error,
  value,
  handleChange,
  m, // margins
  allowClear,
  goals,
  ...props
}) => {
  const [errors, setErrors] = useState({ goal: '', category: '' });

  const handleAdd = () => {
    const { goal, category } = goals[goals.length - 1];
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

    handleChange([...goals, { goal: '', category: '' }]);
  };

  const handleRemove = (i) => {
    handleChange(goals.filter((_, _i) => _i !== i));
  };

  const handleGoalChange = (value, i) => {
    const newGaols = [...goals];
    newGaols[i].goal = value;
    handleChange(newGaols);
  };

  const handleCategoryChange = (value, i) => {
    const newGaols = [...goals];
    newGaols[i].category = value;
    handleChange(newGaols);
  };

  const isLastElement = (i) => {
    return i === goals.length - 1;
  };

  return (
    <>
      {goals.map(({ goal, category }, i) => (
        <S.CardWrapper key={`${goal} + ${category}`}>
          <Textarea
            placeholder="Goal..."
            m={{ mb: 4 }}
            value={goal}
            handleChange={(v) => handleGoalChange(v, i)}
            error={isLastElement(i) && errors.goal}
            autoSize={{ minRows: 1, maxRows: 6 }}
          />
          <Dropdown
            placeholder="Select a category"
            options={dropdowns.therapyGoalsCategories}
            selected={category}
            m={{ mb: 4 }}
            handleChange={(v) => handleCategoryChange(v, i)}
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
              <S.Button onClick={() => handleRemove(i)} right>
                <Icon color="pink" width="16" height="16" icon="bin" />
                <T.P color="pink" m="0" ml="2" bold>
                  Remove
                </T.P>
              </S.Button>
            ) : null}
          </S.ButtonsWrapper>
        </S.CardWrapper>
      ))}
    </>
  );
};

export default TherapyGoals;
