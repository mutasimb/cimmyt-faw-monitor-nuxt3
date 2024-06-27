<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col class="d-flex justify-center align-center">
        <v-sheet style="max-width: 768px">
          <div class="text-h6 font-weight-bold text-uppercase">Welcome to the</div>
          <div class="text-h2 font-oswald font-weight-medium text-uppercase">FALL ARMYWORM MONITOR</div>
          <div class="text-caption font-italic">A tool to collect population, incidence and severity data and empower
            smart integrated pest management decisions.</div>
          <div class="text-body-1 mt-3">FAW monitor is a tool for monitoring Fall Armyworm (FAW) population dynamics and
            field incidence in Bangladesh. The data represented on this website provide up-to-date information on
            population and
            incidence, as reported by the Department of Agricultural Extension (DAE) and will assist agricultural
            development planners, extension agents, and farmers to make informed integrated pest management decisions to
            mitigate the threat posed by Fall Armyworm. The Fall Armyworm Monitor is powered by data collected in
            real-time with association of DAE, BWMRI, BARI, BRRI, CSISA and CIMMYT with support from USAID. The
            information and data shown here do not necessarily reflect the views of USAID, the United States Government,
            and shall not be used for advertising purposes.</div>
          <div class="mt-4">
            <v-btn color="black" variant="flat" to="/guest">Guest</v-btn>
            <v-btn color="black" variant="outlined" class="ml-2" to="/login">Partner Sign-in</v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
