<template>
  <footer class="border-t border-base-300/30 py-10">
    <div class="container mx-auto max-w-6xl px-4">
      <div class="text-center space-y-4">
        <p class="opacity-70">© {{ new Date().getFullYear() }} Chris - Zillionaire</p>

        <div class="divider opacity-30"></div>

        <div class="max-w-4xl mx-auto">
          <h3 class="text-sm font-semibold mb-2 opacity-80">Important Disclaimer</h3>
          <p class="text-xs opacity-60 leading-relaxed">
            <strong>Disclaimer:</strong> All strategies, results, and performance metrics shown are subject to risk. Past performance is not indicative of future results. The information here is for educational and illustrative purposes and is not investment advice. Cryptocurrency and DeFi investments carry substantial risk of loss and are not suitable for all investors. Always conduct your own research and consider consulting with qualified financial advisors before making investment decisions. I am not a registered investment advisor, and nothing contained herein should be construed as investment advice or a recommendation to buy, sell, or hold any security or engage in any investment strategy.
          </p>
        </div>

        <div class="flex justify-center gap-4 text-xs opacity-50">
          <a href="/privacy" class="hover:opacity-70 transition-opacity">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:opacity-70 transition-opacity">Terms of Service</a>
          <span>•</span>
          <a href="/risk-disclosure" class="hover:opacity-70 transition-opacity">Risk Disclosure</a>
        </div>
      </div>
    </div>
  </footer>
</template>
