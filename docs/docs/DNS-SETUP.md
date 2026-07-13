# Domain & DNS Setup Reference

How `marberlearning.org` (registered on Namecheap) is connected to the site hosted on Netlify.

> **Note:** If the site ever moves to a different Netlify account or plan, re-check the current values in Netlify's Domain management page rather than assuming these stay fixed forever.

## Where things live

| Piece | Provider | Purpose |
|---|---|---|
| Domain registration | Namecheap | Owns `marberlearning.org`, renews annually (~$7.50/yr) |
| DNS records | Namecheap → pointed at Netlify | Tells browsers where to find the site |
| Hosting / build | Netlify | Builds and serves the actual website |
| HTTPS certificate | Netlify (free, automatic) | Provides the padlock/secure connection |

## DNS records currently configured (fill in actual values)

In Namecheap → Domain List → `marberlearning.org` → **Advanced DNS**:

| Type | Host | Value | Notes |
|---|---|---|---|
| A | `@` | `98.84.224.111`, `18.208.88.157` | Points the root domain at Netlify's edge servers |
| A | `www` | `98.84.224.111`, `18.208.88.157` | Points `www.marberlearning.org` at the same Netlify edge servers |

Confirmed live with:

```
nslookup marberlearning.org
nslookup www.marberlearning.org
curl -sI https://marberlearning.org   # look for "Server: Netlify" in the response headers
```

## Old domain redirect

`marblelearning.org` (the originally registered domain, note the different spelling) 301-redirects to `marberlearning.org`. This is handled in-app via `public/_redirects`:

```
https://marblelearning.org/*      https://marberlearning.org/:splat   301!
https://www.marblelearning.org/*  https://marberlearning.org/:splat   301!
```

This means `marblelearning.org` still needs its own DNS pointed at the same Netlify site (or wherever it's currently hosted) for the redirect rule to fire — the redirect only works if traffic reaches Netlify in the first place.

## How to verify the connection is working

1. Visit `https://marberlearning.org` — should load the live site with a padlock (HTTPS) in the address bar.
2. Visit `https://marblelearning.org` — should redirect automatically to `https://marberlearning.org`.
3. In Netlify: Site configuration → Domain management should show both domains with a green "Netlify DNS" or "external DNS verified" status, not an error/warning icon.

## If something breaks

- **Site down / DNS not resolving:** check Namecheap's Advanced DNS tab for the domain — records may have been accidentally edited or removed.
- **"Not secure" warning / no padlock:** the HTTPS certificate may need to be reprovisioned. In Netlify: Domain management → HTTPS → "Renew certificate" or "Verify DNS configuration."
- **Redirect from `marblelearning.org` stops working:** confirm that domain's DNS still points at the same Netlify site, and that `public/_redirects` hasn't been removed from the repo.
