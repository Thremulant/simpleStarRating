import React from 'react'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import DefaultLabel from '@sanity/components/lib/labels/DefaultLabel'

import Star from './svg/star.svg'
import StarFilled from './svg/starFilled.svg'

const createPatchFrom = value =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)))

const RadioButton = ({ item, selected, value }) => (
  <>
    <input
      type="radio"
      id={item}
      name="rating"
      value={item}
      style={{
        position: `absolute`,
        top: `-9999px`,
        width: `1px`,
        height: `1px`,
      }}
      selected={selected}
    />
    <label htmlFor={item} style={{ marginRight: `0.25rem` }}>
      {value >= item ? <StarFilled /> : <Star />}
    </label>
  </>
)

const RatingInput = ({ type, value, onChange }) => {
  const handleChange = evt => {
    const val = evt.target.value
    onChange(createPatchFrom(val))
  }

  return (
    <>
      <DefaultLabel>{type.title}</DefaultLabel>
      {type.description && (
        <p style={{ marginTop: `0.25rem`, fontSize: `0.8125rem` }}>
          {type.description}
        </p>
      )}
      <div onChange={handleChange}>
        {[1, 2, 3, 4, 5].map(item => (
          <RadioButton item={item} selected={value === item} value={value} />
        ))}
      </div>
    </>
  )
}

export default RatingInput

RatingInput.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.shape({
      stars: PropTypes.number,
    }).isRequired
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
