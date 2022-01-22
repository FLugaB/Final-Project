import styled from "styled-components";

export const FormGroup = styled.div`
  color: gray;
  background: #150f0f;
  display: block;
  width: 500px;
  margin: 50px auto;
  padding: 80px;
  border-radius: 30px;
`;

export const Label = styled.label`
  margin-bottom: 0.5em;
  color: gray;
  display: block;
`;

export const Input = styled.input`
  padding: 0.5em;
  color: gray;
  background: white;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

export const Message = styled.label`
  margin-bottom: 0.5em;
  color: palevioletred;
  display: block;
`;

export const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-bottom: 1em;

  option {
    color: black;
    background: white;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const FormTitle = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const FormButton = styled.button`
  font-size: 1rem;
  padding:1rem 4rem;
  border: none;
  background: #e31837;
  color: #fff;
  transition: 0.2 ease-out;
  border-radius: 30px;
  margin:1rem auto;

  &:hover {
    background: #ffc500;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }
`;
