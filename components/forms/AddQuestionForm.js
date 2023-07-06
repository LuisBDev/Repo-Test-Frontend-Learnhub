import React, { useState } from "react";
import { Button, Input, Radio } from "antd";

const AddQuestionForm = ({
  valuesQuestion,
  setValuesQuestion,
  handleAddQuestion,
  uploadingQuestion
}) => {
  const [formErrors, setFormErrors] = useState({});

  const handleChangeTitle = (e) => {
    setValuesQuestion({ ...valuesQuestion, title: e.target.value });
  };

  const handleChangeContent = (e) => {
    setValuesQuestion({ ...valuesQuestion, content: e.target.value });
  };

  const handleChangeAnswer = (e) => {
    const answerIndex = e.target.value.toString(); // Convertir a cadena
    setValuesQuestion({ ...valuesQuestion, answer: answerIndex });
  };

  const handleChangeOption = (optionIndex, e) => {
    const options = [...valuesQuestion.options];
    options[optionIndex] = e.target.value;
    setValuesQuestion({ ...valuesQuestion, options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    handleAddQuestion(e);
  };

  const validateForm = () => {
    const errors = {};

    if (!valuesQuestion.title.trim()) {
      errors.title = "El título es requerido";
    }

    if (valuesQuestion.options.some((option) => !option.trim())) {
      errors.options = "Todas las opciones son requeridas";
    }

    if (!valuesQuestion.answer) {
      errors.answer = "Debe seleccionar la respuesta correcta";
    }

    return errors;
  };

  const isFormValid = () => {
    return (
      valuesQuestion.title.trim() &&
      valuesQuestion.options.every((option) => option.trim()) &&
      valuesQuestion.answer
    );
  };

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          className="form-control square"
          value={valuesQuestion.title}
          onChange={handleChangeTitle}
          placeholder="Pregunta"
          autoFocus
          required
        />
        {formErrors.title && <span className="text-danger">{formErrors.title}</span>}

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          value={valuesQuestion.content}
          onChange={handleChangeContent}
          placeholder="Contenido"
          required
        ></textarea>

        <h4>Opciones de respuesta:</h4>
        {valuesQuestion.options.map((option, index) => (
          <div key={option.id}>
            <Radio.Group
              onChange={(e) => handleChangeAnswer(e)}
              value={valuesQuestion.answer.toString()} // Convertir a cadena
            >
              <Radio value={index.toString()}>{option}</Radio>
            </Radio.Group>
            <Input
              type="text"
              value={option}
              onChange={(e) => handleChangeOption(index, e)}
              placeholder={`Opción ${index + 1}`}
              required
            />
            {formErrors.options && <span className="text-danger">{formErrors.options}</span>}
          </div>
        ))}

        {formErrors.answer && <span className="text-danger">{formErrors.answer}</span>}

        <Button
          className="col mt-3"
          size="large"
          type="primary"
          loading={uploadingQuestion}
          shape="round"
          htmlType="submit"
          disabled={!isFormValid()} // Deshabilitar el botón si el formulario no es válido
        >
          Agregar Pregunta
        </Button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
