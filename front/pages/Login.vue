<template>
    <div class="w-screen h-screen flex relative">
        <div class="absolute right-0 bottom-0">
            <img src="../assets/greenpixels.svg" alt="" />
        </div>
        <img
            class="mt-12 ml-12 max-h-52"
            src="../static/logo.png"
            alt="Fiche&Chips"
        />
        <form
            action=""
            class="flex flex-col lg:absolute lg:right-32 lg:bottom-32 lg:w-96"
        >
            <div class="ml-5 mb-4">
                <h1 class="text-5xl">Connexion</h1>
                <p class="underline text-xs opacity-70">
                    Pas encore inscrit ? Cliquez ici
                </p>
            </div>
            <div class="space-y-1">
                <subComponent-CustomInput placeHolder="Identifiant" />
                <subComponent-CustomInput placeHolder="Mot de passe" />
            </div>
            <p class="ml-5 mt-0 underline text-xs opacity-70">
                Mot de passe oublié
            </p>

            <button class="mr-5 self-end text-5xl">Go</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {}
    },
}
</script>
