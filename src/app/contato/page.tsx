'use client'

import {Input} from "@nextui-org/input";
import {RadioGroup, Radio} from "@nextui-org/radio";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select"

const services = [
  {key: "visitas", label: "Visitas guiadas"},
  {key: "roteiros", label: "Roteiros sob medida"},
  {key: "Aulas online", label: "Aulas online"},
]

export default function FaleConosco() {
  const [selected, setSelected] = React.useState("CPF");
  const [email, setEmail] = React.useState("");
  const [value, setValue] = React.useState("");
  const [tel, setTel] = React.useState("");

  const isInvalid = React.useMemo(() => {
      const validate = (value: string) => {
          if (selected === "CNPJ") {
            return value.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
          }
          return value.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
      };

      if (value === "") return false;
      return !validate(value);
  }, [value, selected]); // CPF e CNPJ

  const isInvalidEmail = React.useMemo(() => {
      const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
      if (email === "") return false;

      return validateEmail(email) ? false : true;
  }, [email]); // Email

  const isInvalidTel = React.useMemo(() => {
      const validateTel = (tel: string) => tel.match(/^\(?\d{2}\)?\s?\d{5}-?\d{4}$/);
      if (tel === "") return false;

      return validateTel(tel) ? false : true;
  }, [tel]); // Phone

  return(
    <div className="w-full h-[80em] text-black flex flex-col gap-8 items-center">
      <h1 className="text-3xl font-bold mt-5">Entre em contato!</h1>
      <div className="w-[30em] h-[40em] bg-white rounded-lg flex flex-col items-center py-6">
        <form className="w-[80%] h-full flex flex-col items-center gap-6 relative" action="">
          <Input
            type="text"
            label="Nome"
          />
          <Input 
            type="email" 
            label="Email" 
            isInvalid={isInvalidEmail} 
            color={isInvalidEmail ? "danger" : "default"}  
            errorMessage={`Please enter a valid Email ( your_email@exemple.com )`}
            onValueChange={setEmail}
          />
          <Input 
            type="text" 
            label="Telefone" 
            value={tel}
            isInvalid={isInvalidTel}
            color={isInvalidTel ? "danger" : "default"}  
            errorMessage={`Please enter a valid Phone number ( 056012340123 )`}
            onValueChange={setTel}  
          />
          <RadioGroup 
            label="Seleciona uma opção"
            orientation="horizontal"
            defaultValue="CPF"
            value={selected}
            onValueChange={setSelected}
            size="sm"
          >
            <Radio value="CPF">CPF</Radio>
            <Radio value="CNPJ">CNPJ</Radio>
            <Input 
              type="text" 
              variant="underlined" 
              label={selected} 
              value={value} 
              isInvalid={isInvalid} 
              color={isInvalid ? "danger" : "default"}  
              errorMessage={`Please enter a valid ${selected} ( ${ selected === "CNPJ" ? "xx.xxx.xxx/xxxx-xx" : "xxx.xxx.xxx-xx" } )`}
              onValueChange={setValue}
            />
          </RadioGroup>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Selecione um servico" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Servicos</SelectLabel>
                {services.map((service) => (
                  <SelectItem value={service.key}>{service.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button type="submit" className="absolute bottom-0 bg-yellow-300 p-4 px-16 rounded-lg hover:bg-yellow-500 ease-in transition delay-50 font-bold hover:text-white">Enviar</button>
        </form>
      </div>
    </div>
  )
}
