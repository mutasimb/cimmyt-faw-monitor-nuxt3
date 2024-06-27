<script setup>
definePageMeta({
  middleware: ["admin-only"]
})

const currentUser = useAuthUser();
</script>

<template>
  <div>
    <PageTitle title="Admin page" />
    <PageDescription description="This page should only be visible if user is connected and has admin role" />
    <PageUser :user="currentUser" />
    <div>
      <div>
        <div>
          <div>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Phone</TableHeaderCell>
          </div>
        </div>
        <div>
          <TableBodyCell>{{ currentUser._id }}</TableBodyCell>
          <TableBodyCell>{{ currentUser.phone }}</TableBodyCell>
        </div>
      </div>
    </div>
  </div>
</template>
