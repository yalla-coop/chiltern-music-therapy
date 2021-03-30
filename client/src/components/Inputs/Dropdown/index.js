import { useState } from 'react';
import { Select as AntdSelect } from 'antd';
import * as T from '../../Typography';
import * as S from './style';
import * as CS from './../style';
// import Icon from '../../Icon';

const { OptGroup: AntdOptGroup } = AntdSelect;

const Dropdown = ({
  handleChange,
  label,
  color,
  placeholder = 'Select...',
  error,
  helper,
  w,
  disabled,
  options,
  groupedOptions,
  selected,
  multi,
  m,
}) => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  const decideColor = () => {
    if (error) return 'error';
    return color;
  };

  const isSelected = (option) =>
    selected === option || (selected && selected.toString().includes(option));

  const renderOptions = () => {
    if (groupedOptions) {
      return options.map(({ groupLabel, options: _options }) => (
        <AntdOptGroup
          label={
            <T.P color={color} m="0" mb="2">
              {label}
            </T.P>
          }
          key={groupLabel}
        >
          {_options.map((opt) => (
            <S.Option
              key={`${groupLabel}_${opt.label}`}
              value={opt.value}
              points={opt.points}
              isSelected={isSelected(opt.value)}
            >
              {opt.label}
            </S.Option>
          ))}
        </AntdOptGroup>
      ));
    }
    return options.map(({ value: _value, label: _label }) => (
      <S.Option key={_value} value={_value} label={_label}>
        {_label}
      </S.Option>
    ));
  };

  const handleSearch = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <S.Field
      w={w}
      disabled={disabled}
      open={open}
      focus={focus}
      multi={multi}
      color={decideColor()}
      error={error}
      {...m}
    >
      {label && (
        <CS.Label htmlFor={label}>
          <T.P color={color} m="0" mb="2">
            {label}
          </T.P>
        </CS.Label>
      )}
      <S.Answer>
        <AntdSelect
          value={selected || undefined}
          onSelect={multi ? undefined : handleChange}
          onChange={multi ? handleChange : undefined}
          mode={multi && 'multiple'}
          placeholder={placeholder || 'Type here...'}
          showArrow
          onDropdownVisibleChange={(open) => setOpen(open)}
          dropdownStyle={S.menuStyle}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          filterOption={handleSearch}
        >
          {renderOptions()}
        </AntdSelect>
        {helper && (
          <T.P color={color} mt="2">
            {helper}
          </T.P>
        )}
        {error && (
          <T.P color="error" m="0" mt="1">
            {error}
          </T.P>
        )}
      </S.Answer>
    </S.Field>
  );
};

export default Dropdown;
