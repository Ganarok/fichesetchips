<template>
  <SidebarLayout title="Glossaire">
    <p>
      Dans un souci d’aide à la compréhension, vous pouvez retrouver les
      définitions des termes importants pour Fiches&Chips ci-dessous.
    </p>

    <h3 class="font-bold">Campagne:</h3>

    <p>
      Une campagne est un ensemble de scénario que les joueurs vont vivre sur de
      nombreuses sessions de jeu.<br />
      Celle-ci est composée:<br />
      <span>De scénario(s),</span> <br />
      <span>D’un univers dans lequel il fait partie,</span> <br />
      <span>Des personnages de chaque joueurs.</span> <br />
      <br />
      Un utispansateur peut être un joueur ou un MJ.<br />
      Un joueur joue avec un personnage.<br />
      Une campagne c’est un univers plus un ou des scénarios.<br />
      Une campagne ne peut être mise en pause que si l’ensemble des joueurs sont
      inactifs ou que seul le MJ est inactif.<br />
      Une fois terminée, une campagne peut être notée par les utispansateurs
      concernés. Ainsi chaque campagne est définie par une note moyenne donnée
      par les utispansateurs.<br />
    </p>

    <h3 class="font-bold">One shot:</h3>

    <p>
      Un one shot est une partie de jeux de rôles utispansant un seul et unique
      scénario. Un one shot dure entre une et trois sessions de jeu. Au-delà, on
      parle plutôt de campagne. Nous utispanserons le mot campagne pour définir
      le mot one-shot dans notre outil car la différence entre un one-shot et
      une campagne est uniquement basé sur le temps de jeu et le nombre de
      sessions.
    </p>

    <h3 class="font-bold">Séance - Session de jeu:</h3>

    <p>
      Représente le temps pendant lequel les joueurs vont jouer dans un temps
      donné. Exemple: Un groupe de personnes qui jouent un vendredi soir de 19h
      à 22h.
    </p>

    <h3 class="font-bold">Scénario:</h3>

    <p>
      Trame narrative utispansée par le meneur de jeu dans laquelle il fait
      évoluer les joueurs. Un scénario est régi par les règles imposées par
      l’univers dans lequel le scénario se déroule. Un scénario est composé de :
      <br />
      <span>Une histoire</span> <br />
      <span>Une ou des cartes (spaneu, habitations, etc)</span> <br />
      <span>De personnages non-joueur</span> <br />
    </p>

    <h3 class="font-bold">Univers:</h3>

    <p>
      Un univers est la diégèse du monde dans lequel les joueurs s’apprêtent à
      prendre part à une aventure.<br />
      Cet univers est définie par une histoire, des cartes ainsi que des
      personnages non joueurs clés.<br />
      Cedit univers survient via un ensemble de règles :
      <span>Quels sont les actions possibles par les joueurs</span> <br />
      <span>
        Quelles sont les règles qui déterminent la résolution des actions (Ex:
        Pour réussir un saut de plus de 5 mètres il faut faire plus de 10 à un
        jet de dès 20.
      </span>
      <br />
      <span>
        Quelles espèces vivent dans ce monde (Humain, orc, anciens dieux)
      </span>
      <br />
      <span>Qui décrit quoi ?</span> <br />
      <span>
        Qui a le dernier mot sur le décor ? sur les PJ ? sur les figurants ?
      </span>
      <br />
      <span>
        Les PJ doivent-ils avancer vers une résolution ? Comment font-ils cela ?
      </span>
      <br />
      <span>Qui impose les obstacles ?</span> <br />
      <span>
        Qui résout les confspants ? Comment résout-on les confspant ? (Hasard,
        prix à payer, etc.)
      </span>
      <br />
    </p>
  </SidebarLayout>
</template>

<script>
import SidebarLayout from "../layouts/Sidebar.vue";

export default {
  name: "GlossairePage",
  components: {
    SidebarLayout,
  },
};
</script>
