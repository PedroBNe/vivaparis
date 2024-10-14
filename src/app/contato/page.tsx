"use client";

import { Input } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@nextui-org/checkbox";

const services = [
  { key: "visitas", label: "Visitas guiadas" },
  { key: "roteiros", label: "Roteiros sob medida" },
  { key: "Aulas online", label: "Aulas online" },
];

export default function FaleConosco() {
  const [selected, setSelected] = React.useState("CPF");
  const [email, setEmail] = React.useState("");
  const [value, setValue] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [accept, setAccept] = React.useState(false);
  const [spin, setSpin] = React.useState(false);
  const [all, setAll] = React.useState(false);

  useEffect(() => {
    if (email && value && tel !== "") {
      return () => setAll(true);
    }

    return () => setAll(false);
  });

  const isInvalid = React.useMemo(() => {
    const validate = (value: string) => {
      if (selected === "CNPJ") {
        return value.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
      }
      return value.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    };

    if (value === "") return false;

    return validate(value) ? false : true;
  }, [value, selected]); // CPF e CNPJ

  const isInvalidEmail = React.useMemo(() => {
    const validateEmail = (email: string) =>
      email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]); // Email

  const isInvalidTel = React.useMemo(() => {
    const validateTel = (tel: string) => tel.match(/^\(\d{2}\) \d{5}-\d{4}$/i);
    if (tel === "") return false;

    return validateTel(tel) ? false : true;
  }, [tel]); // Phone

  return (
    <div className="w-full h-[63em] text-black flex flex-col gap-8 items-center overflow-hidden">
      <h1 className="text-3xl font-bold mt-5">Entre em contato!</h1>
      <div className="w-[25em] h-[48em] bg-white rounded-lg flex flex-col items-center py-6">
        <form
          className="w-[80%] h-full flex flex-col items-center gap-6 relative"
          action=""
        >
          <Input type="text" label="Nome" />
          <Input
            type="email"
            label="Email"
            isInvalid={isInvalidEmail}
            color={isInvalidEmail ? "danger" : "default"}
            errorMessage={`your_email@exemple.com`}
            onValueChange={setEmail}
          />
          <Input
            type="text"
            label="Telefone"
            value={tel}
            isInvalid={isInvalidTel}
            color={isInvalidTel ? "danger" : "default"}
            errorMessage={`(00) 00000-0000`}
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
              errorMessage={`Please enter a valid ${selected} ( ${selected === "CNPJ" ? "xx.xxx.xxx/xxxx-xx" : "xxx.xxx.xxx-xx"} )`}
              onValueChange={setValue}
            />
          </RadioGroup>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Selecione um servico" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {services.map((service) => (
                  <SelectItem key={service.key} value={service.key}>{service.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            type="textarea"
            placeholder="Digite sua observacao(opcional)"
            className="w-full px-2 h-[6em] border-[1px] border-black rounded-md overflow-hiddeninput"
          />
          {all && (
            <Checkbox
              isSelected={accept}
              onValueChange={setAccept}
              color="warning"
            >
              <span className="text-sm">
                Concordo com o uso e o compartilhamento de meus dados enviados.
              </span>
            </Checkbox>
          )}
          <Button
            isLoading={spin}
            isDisabled={!accept}
            variant="ghost"
            color="warning"
            size="lg"
            className="absolute bottom-0 w-[80%] py-6"
            onClick={() => {
              setSpin(!spin);
            }}
          >
            <input
              type="submit"
              placeholder="Enviar"
              className={`${spin ? "hidden" : "flex"} w-full py-6 cursor-pointer`}
            />
          </Button>
        </form>
      </div>
    </div>
  );
}
