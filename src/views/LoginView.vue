<script setup lang="ts">
import { StyledButton } from "@/assets/styled/buttons";
import { InputForm } from "@/assets/styled/inputs";
import { httpClient } from "@/infrastructure/api/httpClient";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  login: "",
  password: "",
});

const pushDashboard = async (e: Event) => {
  e.preventDefault();

  try {
    const Form = new FormData();
    Form.append("login", form.login);
    Form.append("email", form.login);
    Form.append("senha", form.password);

    await httpClient.post("/auth/login", Form);

    router.push({ name: "dashboard" });
  } catch {}
};
</script>

<template>
  <div id="LoginContent" class="d-flex flex-column justify-content-center align-items-center">
    <div class="row shadow bg-solarized align-items-center" id="cardForm">
      <form
        @submit="pushDashboard"
        class="col-md-6 d-flex flex-column justify-content-center gap-0"
        style="height: 100%"
      >
        <BFormGroup id="fieldset-1" label-class="mb-4">
          <InputForm
            size="md"
            v-model="form.login"
            class="input-form shadow mb-4"
            id="input-1"
            trim
          />
        </BFormGroup>
        <BFormGroup id="fieldset-1" label-class="mb-4">
          <InputForm
            size="md"
            v-model="form.password"
            class="input-form shadow mb-4"
            id="input-1"
            trim
          />
        </BFormGroup>
        <StyledButton size="md" type="submit" class="shadow mt-3 mb-1 fw-bold" variant="success">
          Login
        </StyledButton>
      </form>
      <div class="col-md-6 bg-white" id="LogoDiv"></div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#LoginContent {
  width: 100%;
  height: 100%;
}

#cardForm {
  width: 65%;
  height: 75%;
  border-radius: 5px;
}

#LogoDiv {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 100%;
}
</style>
