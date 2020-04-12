import React from 'react';
import Select from '../../../../Components/Select';
import TextInput from '../../../../Components/TextInput';


class AddExerciseDisplayer extends React.Component {
  state = {
  }


  render() {
    const {
      displayForm,
      buttonContent,
      exerciseType,
      handleClickAddExercise,
      handleExerciseType,
      handleChangeInput,
      optionsExerciseTypes,
      addExerciseType,
      nameError,
      typeError
    } = this.props;

    return (
      <>
        <button className="emphasize" onClick={handleClickAddExercise}>{buttonContent}</button>
        <div className={displayForm}>
          <fieldset className="flex">
            <label>
              <TextInput name="exerciseName"
                         placeholder="Nom de l'exercise"
                         handleChange={handleChangeInput}/>
            </label>
            {nameError && <div className="flex grow big"><span className="label error">L'exercise existe déjà.</span></div>}
            <label>
              <Select handleOptionChoosed={handleExerciseType}
                      optionValues={["notChoosed"].concat(optionsExerciseTypes)}
                      choosedValue={exerciseType}
                      textDisplayOptions={["Type d'exercise"].concat(optionsExerciseTypes)}/>
            </label>
            {typeError && <div className="flex grow big"><span className="label error">Le type est obligatoire.</span></div>}
            <label>
              <TextInput name="defaultValue"
                        placeholder="Valeur par défault"
                        handleChange={handleChangeInput}/>
            </label>
            <button className="emphasize" onClick={addExerciseType}>Créer le nouvel exercice</button>
          </fieldset>
        </div>
      </>
    )
  }
}

export default AddExerciseDisplayer;
