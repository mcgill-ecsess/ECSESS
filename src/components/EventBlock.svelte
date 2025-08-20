<script lang="ts">
    let {eventTitle, date, location, eventDescription, thumbnail, registrationLink, paymentLink, eventCategory} = $props()
    
    //TODO: Refactor this to be cleaner 
    const description =
    Array.isArray(eventDescription)
        ? eventDescription
            .map(b =>
            Array.isArray(b?.children)
                ? b.children.map((c : any) => (typeof c?.text === "string" ? c.text : "")).join("")
                : ""
            )
            .join("\n")
        : "";
</script>

<style lang="postcss">
  @reference '../app.css';

  .eventCard {
    background: #E8FFD9 ; 
    color: var(--color-ecsess-800);
    border-radius: 22px;
    padding: 22px;
    box-shadow:
      0 0 0 4px rgba(255,255,255,.25) inset,
      0 10px 18px rgba(0,0,0,.12);
    max-width: 980px;
    margin: 0 auto;
  }

  .frame {
    background: var(--color-ecsess-400);
    border-radius: 20px;
  }

  .thumbnail {
    height: 140px;
    border-radius: 16px;
    background: var(--color-ecsess-600);
    display: grid;
    justify-content: center; 
    align-items: center;     
    overflow: hidden;
  }
  .thumbnail img {
    width: 100%;
    height: 100%;
  }

  .content {
    margin-top: 22px;
    display: grid;
    gap: 18px;
  }

  h2 {
    font-size: clamp(26px, 3vw, 34px);
    line-height: 1.05;
    margin: 0;
    letter-spacing: .3px;
    color: var(--color-ecsess-black);
  }

  .desc {
    color: #5E8174;
    max-width: 75ch;
    line-height: 1.5;
    letter-spacing: .2px;
    margin: 0;
    text-align: left;
    justify-self: start;
  }

  .info-row {
    margin-top: 6px;
    display: grid;
    gap: 16px;
  }
  @media (min-width: 740px) {
    .info-row { grid-template-columns: 1fr 1fr; }
  }

  .pill {
    background: #CCE7BA;
    border-radius: 16px;
    padding: 14px 16px;
    display: grid;
    gap: 10px;
  }

.item {
  display: grid;
  grid-template-columns: max-content 1fr;  
  column-gap: 12px;
  align-items: center;
}

.item .label {
  color: #0A3D2A;
  font-weight: 700;  
  margin: 0;
  letter-spacing: .2px;
  text-align: left;
  justify-self: start;
}

.item .value {
  color: #0A3D2A;     
  text-align: left;
  justify-self: start;   
}

  .link {
    color: var(--color-ecsess-black);
    text-decoration: none;
    text-underline-offset: 3px;
  }
  .link:hover {
    color: var(--color-ecsess-black-hover);
    text-decoration: underline;
  }
</style>



<div class="eventCard">
    <div class="frame">
        <div class="thumbnail" aria-label="Event banner">
            {#if thumbnail}
                <img src={thumbnail} alt="Event banner"/>
            {:else if eventCategory[0] === "social"}
                <img src="/Social.jpg" alt="Social Placeholder" />
            {:else if eventCategory[0] === "technical"}
                <img src="/Technical.jpg" alt="Technical Placeholder" />
            {:else if eventCategory[0] === "professional"}
                <img src="/Professional.jpg" alt="Professional Placeholder" />
            {:else if eventCategory[0] === "academic"}
                <img src="/Academic.jpg" alt="Academic Placeholder" />
            {:else}
                <img src="/ECSESS.png" alt="Default Placeholder" />
            {/if}
        </div>
    </div>

    <div class="content">
        <h2>{eventTitle}</h2>
        <p class="desc">
             {description}
        </p>

        <div class="info-row">
            <div class="pill">
                <div class="item">
                    <span class="label"> Datetime: </span>
                    <p class="value">{date}</p>
                </div>
                <div class="item">
                    <span class="label"> Location: </span>
                    <p class="value">
                    {#if location}
                        {location}
                    {:else}
                        TBA 
                    {/if}
                    </p>
                </div>
            </div>
            <div class="pill">
                <div class="item">
                    <span class="label"> Registration: </span>
                    {#if registrationLink}
                        <a class="link" href={registrationLink} target="_blank" rel="noopener noreferrer">Open registration form</a>
                    {:else}
                        <p class="value">TBA</p>
                    {/if}
                </div>
                <div class="item">
                    <span class=label> Payment Link: </span>
                    {#if paymentLink}
                        <a class="link" href={paymentLink} target="_blank" rel="noopener noreferrer">Open payment form</a>
                    {:else}
                        <p class="value">TBA</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>