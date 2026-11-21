import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import MaskedInputDemo from "./MaskedInputDemo";
import PreviewSection from "./PreviewSection";
import PreviewVariant from "./PreviewVariant";

const CATEGORY_OPTIONS = [
  { value: "bebidas", label: "Bebidas" },
  { value: "pizzas", label: "Pizzas" },
];

export default function FormSection() {
  return (
    <>
      <PreviewSection title="Input">
        <PreviewVariant label="default" className="w-full max-w-64">
          <Input label="E-mail" placeholder="Seu email completo..." />
        </PreviewVariant>
        <PreviewVariant label="focus (clique no campo)" className="w-full max-w-64">
          <Input label="E-mail" placeholder="usuario@email.com" />
        </PreviewVariant>
        <PreviewVariant label="error" className="w-full max-w-64">
          <Input
            label="E-mail"
            defaultValue="Email inválido"
            error="Informe um e-mail válido."
          />
        </PreviewVariant>
        <PreviewVariant label="disabled" className="w-full max-w-64">
          <Input label="E-mail" placeholder="Indisponível" disabled />
        </PreviewVariant>
        <PreviewVariant label='size="sm"' className="w-full max-w-64">
          <Input label="E-mail" placeholder="Seu email completo..." size="sm" />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="MaskedInput">
        <MaskedInputDemo mask="telefone" caption='mask="telefone"' />
        <MaskedInputDemo
          mask="cpf"
          defaultValue="000145"
          caption='mask="cpf" (incompleto)'
        />
        <MaskedInputDemo
          mask="cpf"
          defaultValue="11111111111"
          caption='mask="cpf" (inválido)'
        />
        <MaskedInputDemo
          mask="cnpj"
          defaultValue="11222333000181"
          caption='mask="cnpj" (válido)'
        />
        <MaskedInputDemo mask="cep" caption='mask="cep"' />
        <MaskedInputDemo mask="data" caption='mask="data" (dd/mm/aaaa)' />
        <MaskedInputDemo
          mask="valor"
          defaultValue="1234.56"
          caption='mask="valor" (em reais)'
        />
        <MaskedInputDemo
          mask="telefone"
          required
          caption='mask="telefone" (obrigatório)'
        />
      </PreviewSection>

      <PreviewSection title="Dropdown">
        <PreviewVariant label="default" className="w-full max-w-72">
          <Dropdown label="Categoria" options={CATEGORY_OPTIONS} />
        </PreviewVariant>
        <PreviewVariant label="disabled" className="w-full max-w-72">
          <Dropdown label="Categoria" options={CATEGORY_OPTIONS} disabled />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="Toggle">
        <PreviewVariant label="ligado">
          <Toggle label="Disponível" defaultChecked />
        </PreviewVariant>
        <PreviewVariant label="desligado">
          <Toggle label="Disponível" />
        </PreviewVariant>
        <PreviewVariant label="disabled">
          <Toggle label="Disponível" defaultChecked disabled />
        </PreviewVariant>
      </PreviewSection>
    </>
  );
}
