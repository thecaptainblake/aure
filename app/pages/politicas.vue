<template>
  <article class="mx-auto max-w-2xl px-4 py-16 md:px-6">
    <h1 class="font-serif text-4xl md:text-5xl">Políticas</h1>
    <div class="mt-10 space-y-10 text-sm leading-relaxed text-ink">
      <section aria-labelledby="envios">
        <h2 id="envios" class="font-serif text-3xl">Envíos</h2>
        <p class="mt-3">
          Enviamos a todo México. El costo y el tiempo se confirman por WhatsApp según la pieza y tu código postal. No hay checkout en el sitio.
        </p>
      </section>
      <section aria-labelledby="garantia">
        <h2 id="garantia" class="font-serif text-3xl">Garantía</h2>
        <p class="mt-3">
          Cubrimos defectos de fabricación. El desgaste por uso, golpes o contacto con químicos no entra en la garantía. Escríbenos con fotos de la pieza.
        </p>
      </section>
      <section aria-labelledby="devoluciones">
        <h2 id="devoluciones" class="font-serif text-3xl">Devoluciones</h2>
        <p class="mt-3">
          Los cambios dependen de la pieza. Las hechas sobre pedido o ya usadas no siempre se pueden devolver. Platícalo por WhatsApp antes de usarla.
        </p>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'Políticas',
  description:
    'Envíos, garantía y devoluciones de Aure Monterrey. Confirmamos costo, talla y cambios por WhatsApp.',
  path: '/politicas',
})
</script>
